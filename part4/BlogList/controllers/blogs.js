const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
// const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})


blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const userId = request.user
    if (!userId) return

    const blog = new Blog(request.body)
    blog.user = userId
    const saveResult = await blog.save()
    response.status(201).json(saveResult)

    const oldBlogs = (await User.findById(userId)).blogs // todo: ?? sth wrong with changing with errors?
    await User.findByIdAndUpdate(userId, { blogs: oldBlogs.concat(blog._id) })
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const userId = request.user
    if (!userId) return

    const rid = request.params.id
    const blogToDelete = await Blog.findById(rid)

    if (blogToDelete && blogToDelete.user.toString() !== userId.toString()) {
        // ^first check because there may be no such post
        return response.status(401).json({ error: 'only the creator can delete a post' })
    }

    await Blog.findByIdAndDelete(rid)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => { // todo: auth
    const rid = request.params.id
    const data = request.body
    // Let's forbid changing id, as I see no reason to do it and it may break something
    if (data._id !== undefined && data._id !== rid) {
        return response.status(400).json({ error: 'id should not change' })
    }
    const updated = await Blog.findByIdAndUpdate(rid, data, { new: true, runValidators: true })
    response.json(updated)
})

module.exports = blogRouter