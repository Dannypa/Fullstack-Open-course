const { test, describe, beforeEach, after } = require('node:test')
const config = require('../utils/config')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const uh = require('./userTestHelper')
const mongoose = require('mongoose')
const { validUserToAdd } = require('./userTestHelper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    await User.insertMany(uh.initialUsersHashed)
})

describe('adding users', () => {
    describe('valid user', () => {

        test('it is possible to add a user with valid information,' +
            'end the added user should be returned as json', async () => {
            const response = await api
                .post(config.USER_URL)
                .send(uh.validUserToAdd)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            const returnedUser = response.body
            assert(uh.areEqual(uh.validUserToAddHashed, returnedUser))
        })

        test('it is possible to add a user with valid information,' +
            'end the added user should be stored in the database', async () => {
            await api
                .post(config.USER_URL)
                .send(uh.validUserToAdd)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const search = await User.find({ username: uh.validUserToAdd.username })

            assert(search)
            assert(uh.isHashed(uh.validUserToAdd, search[0]))
            assert.strictEqual((await User.find({})).length, uh.initialUsers.length + 1)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})