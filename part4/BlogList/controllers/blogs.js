const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const userId = blog.user
    const oldBlogs = (await User.findById(userId)).blogs
    await User.findByIdAndUpdate(userId, { blogs: oldBlogs.concat(blog._id) })
    const saveResult = await blog.save()
    response.status(201).json(saveResult)
})

blogRouter.delete('/:id', async (request, response) => {
    const rid = request.params.id

    await Blog.findByIdAndDelete(rid)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
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