const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const uuid = require('uuid')


commentRouter.post('/:id/comments/', async (req, resp) => {
    const blogId = req.params.id

    const currentComments = (await Blog.findById(blogId)).comments
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { comments: currentComments.concat({ body: req.body.comment, id: uuid.v4() }) }, { new: true })

    resp.json(updatedBlog)
})

module.exports = commentRouter