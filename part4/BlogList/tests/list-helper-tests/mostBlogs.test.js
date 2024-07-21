const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../../utils/list_helper')
const { listWithOneBlog, someBlogs } = require('../blog-api-tests/blogTestHelper')


describe('mostBlogs', () => {
    test('when the list is empty should return undefined', () => {
        assert.strictEqual(listHelper.favoriteBlog([]), undefined)
    })


    test('when the list contain one blog should return {author: author, blogs: 1}', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog),
            { author: listWithOneBlog[0].author,
                blogs: 1 })
    })


    test('return the object with a positive blogs property when the list is not empty', () => {
        assert(listHelper.mostBlogs(someBlogs).blogs > 0)
    })

    test('return the author with the most blogs from the list', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(someBlogs),
            { author: 'Robert C. Martin',
                blogs:3 })
    })
})