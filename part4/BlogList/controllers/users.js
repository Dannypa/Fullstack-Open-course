const config = require('../utils/config')
const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, resp) => {
    const { username, name, password } = req.body

    if (password === undefined) {
        return resp.status(400).json({ error: 'password is required' })
    }
    if (password.length < 3) {
        return resp.status(400).json({ error: 'invalid password' })
    }
    const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS)
    const savedUser = await (new User({ username, name, passwordHash })).save()
    resp.status(201).json(savedUser)
})

userRouter.get('/', async (req, resp) => {
    const users = await User.find({}).populate('blogs')
    resp.json(users)
})

module.exports = userRouter