const logger = require('../utils/logger')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { someBlogs, listWithOneBlog, blogContent } = require('./testHelper')

const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({}) // this will be catastrophic if run in prod...

    for (const blog of someBlogs) {
        await new Blog(blog).save()
    }
})

test.only(`get before adding blogs should return ${someBlogs.length} blogs in json format`, async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, someBlogs.length)
})

test.only(`after adding a blog, get should return ${someBlogs.length + 1} blogs in json format 
            and the added blog should be among them`, async () => {
    const blogToAdd = new Blog(listWithOneBlog[0])
    await blogToAdd.save()

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const blogs = response.body

    assert.strictEqual(blogs.length, someBlogs.length + 1)
    assert(blogs.some(blog =>
        blog.title === blogToAdd.title
        && blog.author === blogToAdd.author
        && blog.url === blogToAdd.url
        && blog.likes === blogToAdd.likes
    ))
})



after(async () => {
    await mongoose.connection.close()
})