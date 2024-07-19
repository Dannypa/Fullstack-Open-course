const lodash = require('lodash')

const dummy = (_) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((currentSum, nextBlog) => currentSum + nextBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    let fav = 0
    blogs.forEach((blog, i) => {
        if (blog.likes > blogs[fav].likes) {
            fav = i
        }
    })
    return blogs[fav]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    let best = { blogs: -1 }

    Object.entries(
        lodash
            .groupBy(blogs, (b) => b.author)
    )
        .map(([...[author, blogs]]) => {
            return {
                author,
                blogs: blogs.length
            }
        })
        .forEach((authorInfo) => {
            if (authorInfo.blogs > best.blogs) {
                best = authorInfo
            }
        })
    return best // damn thats cringe
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    let best = { likes: -1 }

    Object.entries(
        lodash
            .groupBy(blogs, (b) => b.author)
    )
        .map(([...[author, blogs]]) => {
            return {
                author,
                likes: blogs.reduce(
                    (currentSum, nextBlog) => currentSum + nextBlog.likes,
                    0
                )
            }
        })
        .forEach((authorInfo) => {
            if (authorInfo.likes > best.likes) {
                best = authorInfo
            }
        })
    return best // damn thats cringe
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}