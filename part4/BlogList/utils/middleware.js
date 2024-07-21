const logger = require('./logger')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (req, resp) => {
    resp.status(404).json({ error: 'unknown endpoint' })
}

const userExtractor = (req, resp, next) => {
    const auth = req.get('authorization')
    if (!auth || !auth.startsWith('Bearer ')) {
        return resp.status(401).json({ error: 'a valid token must be provided' })
    }
    const token = auth.replace('Bearer ', '')
    const tokenData = jwt.verify(token, process.env.SECRET)
    if (!tokenData.id) {
        return resp.status(401).json({ error: 'a valid token must be provided' })
    }
    req.user = tokenData.id

    next()
}

const errorHandler = (error, req, resp, next) => {
    logger.error(error)

    if (error.name === 'ValidationError') {
        return resp.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return resp.status(400).json({ error: 'usernames must be unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return resp.status(401).json({ error: 'token missing or invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return resp.status(401).json({ error: 'token expired' })
    }

    next(error)
}

module.exports = {
    userExtractor,
    unknownEndpoint,
    errorHandler
}