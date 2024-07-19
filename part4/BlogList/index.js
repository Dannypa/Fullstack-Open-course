const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUri = process.env.MONGODB_URI
console.log(`connecting to ${mongoUri}...`)

mongoose.connect(mongoUri)
    .then(_ => {
        console.log('Successfully connected to the database!')
    }).catch(error => {
        console.log(`Error when connecting to the db: ${error.message}`)
    })

app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})