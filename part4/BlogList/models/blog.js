const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, required:true },
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: Array
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog