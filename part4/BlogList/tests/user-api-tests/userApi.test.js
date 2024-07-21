const { test, describe, beforeEach, after } = require('node:test')
const config = require('../../utils/config')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../../app')
const User = require('../../models/user')
const uh = require('./userTestHelper')
const mongoose = require('mongoose')
const { validUserToAdd } = require('./userTestHelper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    await User.insertMany(uh.initialUsersHashed)
})

const testInvalid = (errorMessage, invalidUser) => {
    test.only(`the server returns status 400 and the error message "${errorMessage}"`, async () => {
        const response = await api
            .post(config.USER_URL)
            .send(invalidUser)
            .expect(400)
        assert(response.body.error.includes(errorMessage))
    })

    test.only('no users are added to the db', async () => {
        await api
            .post(config.USER_URL)
            .send(invalidUser)
        assert.strictEqual((await User.find({})).length, uh.initialUsers.length)
    })
}

describe.only('adding users', () => {
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

    describe.only('invalid user', () => {

        describe.only('when adding a user with a username shorter then 3 characters', () =>
            testInvalid('invalid username', uh.invalidUsernameUser)
        )

        describe.only('when adding a user with a password shorter then 3 characters', () =>
            testInvalid('invalid password', uh.invalidPasswordUser)
        )

        describe.only('when adding a user with no username', () =>
            testInvalid('username is required', uh.noUsernameUser)
        )

        describe.only('when adding a user with no password', () =>
            testInvalid('password is required', uh.noPasswordUser)
        )

        describe.only('when adding a user with a username which is not unique', () => {
            testInvalid('usernames must be unique', uh.duplicateUsernameUser)
        })

    })
})

after(async () => {
    await mongoose.connection.close()
})