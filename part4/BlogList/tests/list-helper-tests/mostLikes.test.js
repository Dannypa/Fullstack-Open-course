const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../../utils/list_helper')
const { listWithOneBlog, noLikeBlogs, someBlogs } = require('../blog-api-tests/blogTestHelper')

describe('mostLikes', () => {
    test('when the list is empty should return undefined', () => {
        assert.strictEqual(listHelper.mostLikes([]), undefined)
    })


    test('when the list contain one blog should return info about the author of the blog', () => {
        assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog),
            { author: listWithOneBlog[0].author,
                likes: listWithOneBlog[0].likes })
    })



    test('return the object with a non-negative likes property when the list is not empty', () => {
        assert(listHelper.mostLikes(noLikeBlogs).likes >= 0)
    })



    test('return the author with the most blogs from the list', () => {
        assert.deepStrictEqual(listHelper.mostLikes(someBlogs),
            {
                author: 'Edsger W. Dijkstra',
                likes: 17
            })
    })
})