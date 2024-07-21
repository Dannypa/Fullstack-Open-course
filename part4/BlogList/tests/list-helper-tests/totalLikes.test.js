const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../../utils/list_helper')
const { listWithOneBlog, someBlogs } = require('../blog-api-tests/blogTestHelper')


describe('totalLikes', () => {

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })


    test('when the list is empty, equals 0', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('equals the sum of likes on the blog posts provided', () => {
        assert.strictEqual(listHelper.totalLikes(someBlogs), 36)
    })
})