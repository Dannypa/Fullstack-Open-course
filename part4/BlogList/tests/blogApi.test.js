const logger = require('../utils/logger')
const { test, describe, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { someBlogs, listWithOneBlog, idToDelete, nonExistingId } = require('./testHelper')

const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({}) // this will be catastrophic if run in prod...

    for (const blog of someBlogs) {
        await new Blog(blog).save()
    }
})

describe('when getting blogs...', () => {

    test(`get before adding blogs should return ${someBlogs.length} blogs in json format`, async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, someBlogs.length)
    })

    test('blogs returned should have the "id" property for the unique identifier instead of _id', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        assert(Object.hasOwn(blog,'id'))
        assert(!Object.hasOwn(blog,'_id'))
    })

})


describe('when adding blogs...', () => {

    test(`it is possible to successfully add a blog; \
          after that, get should return ${someBlogs.length + 1} blogs in json format\
          and the added blog should be among them`, async () => {
        const blogToAdd = listWithOneBlog[0]
        await api.post('/api/blogs')
            .send(blogToAdd)
            .expect(201)

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


    test('if blog is added with missing "likes" property it should default to 0', async () => {
        // assuming blogToAdd has every other field and that there is at most one blog for every group <title, author, url>
        const blogToAdd = listWithOneBlog[0]
        delete blogToAdd.likes
        assert(!Object.hasOwn(blogToAdd, 'likes'))
        await (new Blog(blogToAdd)).save()

        const response = await api.get('/api/blogs') // todo: change so that the query is to the db
        const added = response.body.find(blog =>
            blog.title === blogToAdd.title
            && blog.author === blogToAdd.author
            && blog.url === blogToAdd.url) // do not check likes as there are no such field in blogToAdd
        logger.info(added)
        assert.strictEqual(added.likes, 0)
    })


    test('if addition of a blog with missing title or url is attempted, ' +
         'the response code should be 400 and no blogs should be added', async () => {
        // try with no title
        let blogToAdd = listWithOneBlog[0]
        delete blogToAdd.title

        await api.post('/api/blogs').send(blogToAdd).expect(400)

        // try with no url
        blogToAdd = listWithOneBlog[0]
        logger.info(blogToAdd)
        delete blogToAdd.url

        await api.post('/api/blogs').send(blogToAdd).expect(400)

        const response = await api.get('/api/blogs').expect(200)
        assert.strictEqual(response.body.length, someBlogs.length)
    })

})


describe('when deleting a blog...', () => {

    describe('that previously was in the database...', () => {
        beforeEach(async () => {
            await api.delete(`/api/blogs/${idToDelete}`).expect(204)
        })

        test('the removed blog should not be in the database', async () => {
            const removedBlog = await Blog.findById(idToDelete)
            logger.info(removedBlog)
            assert.strictEqual(removedBlog, null)
        })

        test('the number of blogs should decrease by 1', async () => {
            const blogsLeft = await Blog.find({})
            assert.strictEqual(blogsLeft.length, someBlogs.length - 1)
        })
    })

    describe('that was not in the database', () => {
        beforeEach(async () => {
            await api.delete(`/api/blogs/${nonExistingId}`).expect(204)
        })

        test('the number of the blogs should not change', async () => {
            const blogsLeft = await Blog.find({})
            assert.strictEqual(blogsLeft.length, someBlogs.length)
        })
    })
})


after(async () => {
    await mongoose.connection.close()
})