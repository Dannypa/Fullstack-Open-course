const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
// const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

const extractToken = request => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    }
    return null
}

blogRouter.post('/', async (request, response) => {
    const token = extractToken(request)
    const tokenData = jwt.verify(token, process.env.SECRET)
    if (!tokenData.id) {
        response.status(401).json({ error: 'token invalid' })
    }
    const userId = tokenData.id

    const blog = new Blog(request.body)
    blog.user = userId
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