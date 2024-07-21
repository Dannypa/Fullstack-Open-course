const config = require('../../utils/config')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const uh = require('../userTestHelper')
const supertest = require('supertest')
const app = require('../../app')
const User = require('../../models/user')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    await User.insertMany(uh.initialUsersHashed)
})

test('it is possible to login and get token sent back as json' +
    'with correct username and password', async () => {
    const response = await api
        .post(config.LOGIN_URL)
        .send(uh.initialUsers[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert(response.body.token)
})

test('it is not possible to login with the password from another user, ' +
    'and server responds with code 401', async () => {
    const dummyUser = {
        username: uh.initialUsers[0].username,
        password: uh.initialUsers[1].password
    }

    await api
        .post(config.LOGIN_URL)
        .send(dummyUser)
        .expect(401)
})

after(async () => {
    await mongoose.connection.close()
})