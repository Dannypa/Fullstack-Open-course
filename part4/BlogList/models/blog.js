const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, required:true },
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: '669ceb6837b026852f10310c' // todo: remove default later
    },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 }
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