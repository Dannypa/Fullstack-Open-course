const dummy = (_) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((currentSum, nextBlog) => currentSum + nextBlog.likes, 0)
}

module.exports = {
    dummy,
    totalLikes
}