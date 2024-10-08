const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentRouter = require('./controllers/comments')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const mongoUri = config.MONGODB_URI
logger.info(`connecting to ${mongoUri}...`)

mongoose.connect(mongoUri)
    .then(_ => {
        logger.info('Successfully connected to the database!')
    }).catch(error => {
        logger.info(`Error when connecting to the db: ${error.message}`)
    })

app.use(express.json())
app.use(config.BLOG_URL, blogRouter)
app.use(config.USER_URL, userRouter)
app.use(config.LOGIN_URL, loginRouter)
app.use(config.BLOG_URL, commentRouter)

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/testing')
    app.use(config.TESTING_URL, testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app