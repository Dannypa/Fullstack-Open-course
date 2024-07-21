const logger = require('./logger')

const unknownEndpoint = (req, resp) => {
    resp.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, resp, next) => {
    logger.error(error)

    if (error.name === 'ValidationError') {
        return resp.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return resp.status(400).json({ error: 'usernames must be unique' })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}