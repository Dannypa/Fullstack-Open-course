const listWithOneBlog = [
    {
        _id: '669ae84f4db5045ed3057cd1',
        title: 'Check Out This Fire Post By Me!',
        author: 'Rick',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        likes: 5,
        __v: 0
    }
]

const blogToAdd = listWithOneBlog[0]

const noLikeBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
    },
]

const someBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const idToDelete = someBlogs[0]._id
const nonExistingId = '5a422bc61b54a676234d17f0'

const blogContent = (blog) => ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes:blog.likes })

const areEqual = (
    blog1,
    blog2,
    skipTitle = false,
    skipAuthor = false,
    skipUrl = false,
    skipLikes = false
) => (blog1.title === blog2.title || skipTitle)
    && (blog1.author === blog2.author || skipAuthor)
    && (blog1.url === blog2.url || skipUrl)
    && (blog1.likes === blog2.likes || skipLikes)

module.exports = {
    listWithOneBlog,
    noLikeBlogs,
    someBlogs,
    idToDelete,
    nonExistingId,
    blogContent,
    areEqual
}