require('dotenv').config()
const config = require('../utils/config')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


loginRouter.post('/', async (req, resp) => {
    const { username, password } = req.body

    const savedUser = await User.findOne({ username })
    const passwordCheck = savedUser ?
        await bcrypt.compare(password, savedUser.passwordHash) : false
    if (!passwordCheck) {
        resp.status(401).json({ error: 'wrong username or password' })
    }

    const token = jwt.sign({
        username,
        id: savedUser._id,
    }, process.env.SECRET,
    { expiresIn: 60 * 60 * 24 })

    resp.json({ token, username, name: savedUser.name })
})

module.exports = loginRouter