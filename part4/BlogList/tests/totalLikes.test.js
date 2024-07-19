const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })


    test('when the list is empty, equals 0', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    const someBlogs = [
        {
            _id: '6699ac12801615fa04f6c5bb',
            title: 'a test blog',
            author: 'my good friend rick',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            likes: 17000000,
            __v: 0
        },
        {
            _id: '6699ac40112d9aed01f0ce17',
            title: 'a test blog',
            author: 'my good friend rick',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            likes: 100713,
            __v: 0
        },
        {
            _id: '669a7d55f5eae7c7810562f7',
            title: 'a test blog',
            author: 'my good friend rick',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            likes: 1234,
            __v: 0
        }
    ]

    test('equals the sum of likes on the blog posts provided', () => {
        assert.strictEqual(listHelper.totalLikes(someBlogs), 17101947)
    })
})