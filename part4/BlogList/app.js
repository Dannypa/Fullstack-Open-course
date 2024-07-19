const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const mongoUri = config.MONGODB_URI
logger.info(`connecting to ${mongoUri}...`)

mongoose.connect(mongoUri)
    .then(_ => {
        logger.info('Successfully connected to the database!')
    }).catch(error => {
        logger.info(`Error when connecting to the db: ${error.message}`)
    })

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app