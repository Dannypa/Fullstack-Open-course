const logger = require('../../utils/logger')
const config = require('../../utils/config')
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const User = require('../../models/user')
const { someBlogs, listWithOneBlog, idToDelete, nonExistingId, blogToAdd, changedFirstBlog, areEqual, blogCopy } = require('./blogTestHelper')
const uh = require('../userTestHelper')

const api = supertest(app)

const Blog = require('../../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({}) // this will be catastrophic if run in prod...
    await User.deleteMany({})


    await Blog.insertMany(someBlogs.map(b => new Blog(b)))
    await User.insertMany(uh.initialUsersInDb)
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


const successfullAdditionCheck = async (blog) => {
    await api.post(config.BLOG_URL)
        .set('Authorization', `Bearer ${token}`)
        .send(blog) // todo: sad that blogToAdd is a global variable.
        .expect(201)
}

let token = ''
const setToken = async () => {
    // I have no other option then to make an api request I think
    const response = await api
        .post(config.LOGIN_URL)
        .send(uh.theAuthor)
    token = response.body.token
}

describe('when adding blogs...', () => { // todo: check that the users blogs variable change

    beforeEach(setToken)

    test(`it is possible to successfully add a blog when a user is logged in; \
          after that, there should be ${someBlogs.length + 1} blogs stored in the db\
          and the added blog should be among them`, async () => {
        const blogToAdd = listWithOneBlog[0]
        await successfullAdditionCheck(blogToAdd)

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
        const blogToAdd = blogCopy(listWithOneBlog[0])
        delete blogToAdd.likes
        assert(!Object.hasOwn(blogToAdd, 'likes'))
        await successfullAdditionCheck(blogToAdd)

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
        let blogToAdd = blogCopy(listWithOneBlog[0])
        delete blogToAdd.title

        await api.post(config.BLOG_URL).set('Authorization', `Bearer ${token}`).send(blogToAdd).expect(400)

        // try with no url
        blogToAdd = blogCopy(listWithOneBlog[0])
        delete blogToAdd.url

        await api.post(config.BLOG_URL).set('Authorization', `Bearer ${token}`).send(blogToAdd).expect(400)

        const response = await Blog.find({})
        assert.strictEqual(response.length, someBlogs.length)
    })

    test('it is not possible to add blog with no token', async () => {
        await api
            .post(config.BLOG_URL)
            .send(blogToAdd)
            .expect(401)
    })

    test('it is not possible to add blog with an invalid token', async () => {
        await api
            .post(config.BLOG_URL)
            .set('Authorization', 'Bearer 123')
            .expect(401)
    })

})


const checkConstBlogNumber = async () => {
    const blogsLeft = await Blog.find({})
    assert.strictEqual(blogsLeft.length, someBlogs.length)
}

const deleteBlogAuth = async (id) => {
    await api.delete(`${config.BLOG_URL}/${id}`).set('Authorization', `Bearer ${token}`).expect(204)
}

describe.only('when deleting a blog...', () => {
    beforeEach(setToken)

    describe.only('that previously was in the database...', () => {
        beforeEach(async () => await deleteBlogAuth(idToDelete))

        test.only('the removed blog should not be in the database', async () => {
            const removedBlog = await Blog.findById(idToDelete)
            console.log(removedBlog)
            assert.strictEqual(removedBlog, null)
        })

        test.only('the number of blogs should decrease by 1', async () => {
            const blogsLeft = await Blog.find({})
            assert.strictEqual(blogsLeft.length, someBlogs.length - 1)
        })
    })

    describe.only('that was not in the database', () => {
        beforeEach(async () => await deleteBlogAuth(nonExistingId))

        test.only('the number of the blogs should not change', checkConstBlogNumber)
    })

    describe('while not authenticated, the server should send code 401 and ', () => {
        beforeEach(async () => await api.delete(`${config.BLOG_URL}/${idToDelete}`).expect(401))

        test('the number of the blogs should not change', checkConstBlogNumber)
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