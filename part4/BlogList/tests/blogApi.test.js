const logger = require('../utils/logger')
const config = require('../utils/config')
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { someBlogs, listWithOneBlog, idToDelete, nonExistingId, blogToAdd, changedFirstBlog, areEqual, blogCopy } = require('./testHelper')

const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({}) // this will be catastrophic if run in prod...

    await Blog.insertMany(someBlogs.map(b => new Blog(b)))
})

describe('when getting blogs...', () => {

    test(`get before adding blogs should return ${someBlogs.length} blogs in json format`, async () => {
        const response = await api
            .get(config.BLOG_URL)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, someBlogs.length)
    })

    test('blogs returned should have the "id" property for the unique identifier instead of _id', async () => {
        const response = await api.get(config.BLOG_URL)
        const blog = response.body[0]
        assert(Object.hasOwn(blog,'id'))
        assert(!Object.hasOwn(blog,'_id'))
    })

})


describe('when adding blogs...', () => {

    test(`it is possible to successfully add a blog; \
          after that, there should be ${someBlogs.length + 1} blogs stored in the db\
          and the added blog should be among them`, async () => {
        const blogToAdd = listWithOneBlog[0]
        await api.post(config.BLOG_URL)
            .send(blogToAdd)
            .expect(201)

        const blogs = await Blog.find({})

        assert.strictEqual(blogs.length, someBlogs.length + 1)
        assert(Blog.find({
            title: blogToAdd.title,
            author: blogToAdd.author,
            url: blogToAdd.url,
            likes: blogToAdd.likes
        }))
    })


    test('if blog is added with missing "likes" property it should default to 0', async () => {
        // assuming blogToAdd has every other field and that there is at most one blog for every group <title, author, url>
        const blogToAdd = listWithOneBlog[0]
        delete blogToAdd.likes
        assert(!Object.hasOwn(blogToAdd, 'likes'))
        await (new Blog(blogToAdd)).save()

        // do not check likes as there are no such field in blogToAdd
        const added = await Blog.find({
            title: blogToAdd.title,
            author: blogToAdd.author,
            url: blogToAdd.url
        })
        logger.info(added)
        assert.strictEqual(added[0].likes, 0)
    })


    test('if addition of a blog with missing title or url is attempted, ' +
         'the response code should be 400 and no blogs should be added to the db', async () => {
        // try with no title
        let blogToAdd = listWithOneBlog[0]
        delete blogToAdd.title

        await api.post(config.BLOG_URL).send(blogToAdd).expect(400)

        // try with no url
        blogToAdd = listWithOneBlog[0]
        logger.info(blogToAdd)
        delete blogToAdd.url

        await api.post(config.BLOG_URL).send(blogToAdd).expect(400)

        const response = await Blog.find({})
        assert.strictEqual(response.length, someBlogs.length)
    })

})


describe('when deleting a blog...', () => {

    describe('that previously was in the database...', () => {
        beforeEach(async () => {
            await api.delete(`${config.BLOG_URL}/${idToDelete}`).expect(204)
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
            await api.delete(`${config.BLOG_URL}/${nonExistingId}`).expect(204)
        })

        test('the number of the blogs should not change', async () => {
            const blogsLeft = await Blog.find({})
            assert.strictEqual(blogsLeft.length, someBlogs.length)
        })
    })
})


const checkNoChange = async (idToChange, changedBlog) => {
    const oldData = await Blog.findById(idToChange)
    await api
        .put(`${config.BLOG_URL}/${idToChange}`)
        .send(changedBlog)
        .expect(400)
    const dataAfterChange = await Blog.findById(idToChange)
    assert(areEqual(oldData, dataAfterChange))
}

describe('when changing a blog...', () => {

    describe('so that the new blog is valid', () => {

        test('the blog with the provided id should change in the db' +
            'and the new blog should be returned in a json format', async () => {
            const idToChange = changedFirstBlog._id

            const response = await api
                .put(`${config.BLOG_URL}/${idToChange}`)
                .send(changedFirstBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const changed = response.body
            assert(areEqual(changed, changedFirstBlog))
            const changedBlogInDb = await Blog.findById(idToChange)
            assert(areEqual(changedBlogInDb, changedFirstBlog))
        })

        test('the number of blogs should stay the same', async () => {
            const idToChange = changedFirstBlog._id

            await api
                .put(`${config.BLOG_URL}/${idToChange}`)
                .send(changedFirstBlog)

            const blogs = await Blog.find({})
            assert.strictEqual(blogs.length, someBlogs.length)
        })

    })

    test('so that the id of the new blog is different from the original,' +
        'the server should response with code 400 ' +
        'and the blog in the db should not change', async () => {
        const idToChange = changedFirstBlog._id
        const changedBlogCopy = blogCopy(changedFirstBlog)
        changedBlogCopy._id = blogToAdd._id
        // ^ it is not in the db at this point, so there are no issues with duplicated ids

        await checkNoChange(idToChange, changedBlogCopy)
    })
})


after(async () => {
    await mongoose.connection.close()
})