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

test(`get before adding blogs should return ${someBlogs.length} blogs in json format`, async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, someBlogs.length)
})

test(`after adding a blog, get should return ${someBlogs.length + 1} blogs in json format 
            and the added blog should be among them`, async () => {
    const blogToAdd = new Blog(listWithOneBlog[0])
    await blogToAdd.save()

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const blogs = response.body

    assert.strictEqual(blogs.length, someBlogs.length + 1)
    assert(blogs.find(blog =>
        blog.title === blogToAdd.title
        && blog.author === blogToAdd.author
        && blog.url === blogToAdd.url
        && blog.likes === blogToAdd.likes
    ))
})


test('blogs returned should have the "id" property for the unique identifier instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert(Object.hasOwn(blog,'id'))
    assert(!Object.hasOwn(blog,'_id'))
})

test('if blog is added with missing "likes" property it should default to 0', async () => {
    // assuming blogToAdd has every other field and that there is at most one blog for every group <title, author, url>
    const blogToAdd = listWithOneBlog[0]
    delete blogToAdd.likes
    assert(!Object.hasOwn(blogToAdd, 'likes'))
    await (new Blog(blogToAdd)).save()

    const response = await api.get('/api/blogs')
    const added = response.body.find(blog =>
        blog.title === blogToAdd.title
        && blog.author === blogToAdd.author
        && blog.url === blogToAdd.url) // do not check likes as there are no such field in blogToAdd
    logger.info(added)
    assert.strictEqual(added.likes, 0)
})


after(async () => {
    await mongoose.connection.close()
})