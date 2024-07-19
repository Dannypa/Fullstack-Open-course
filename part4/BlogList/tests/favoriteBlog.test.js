const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, someBlogs } = require('./testHelper')


describe('favoriteBlog', () => {
    test('when the list is empty should return undefined', () => {
        assert.strictEqual(listHelper.favoriteBlog([]), undefined)
    })

    test('when the list contain one element should return that element', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
    })

    test('return the blog from the list when the list is not empty', () => {
        assert(someBlogs.includes(listHelper.favoriteBlog(someBlogs)))
    })

    test('return the blog with the most likes from the list', () => {
        assert.strictEqual(listHelper.favoriteBlog(someBlogs).likes, 12)
    })
})