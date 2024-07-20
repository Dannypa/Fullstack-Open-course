const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
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
