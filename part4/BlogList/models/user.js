const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        validate: {
            validator: (v) => v.length >= 3,
            message: 'invalid username',
        },
        unique: true // todo: according to the docs (https://mongoosejs.com/docs/validation.html), this is bad practice
    },
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = document._id.toString()
        delete returned._id
        delete returned.__v
        delete returned.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
