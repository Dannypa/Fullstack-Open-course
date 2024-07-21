const bcrypt = require('bcrypt')
const config = require('../utils/config')

const hashUser = (user) => ({
    username: user.username,
    name: user.name,
    passwordHash: bcrypt.hashSync(user.password, config.SALT_ROUNDS) // using sync here as this is for testing
})

const areEqual = (user1, user2) => (
    user1.username === user2.username
    && user1.name === user2.name
    && user1.password === user2.password
)

const isHashed = (user, hashedUser) => (
    user.username === hashedUser.username
    && user.name === hashedUser.name
    && bcrypt.compareSync(user.password, hashedUser.passwordHash)
)

const initialUsers = [{
    username: 'dannypa',
    name: 'Daniil Parniukov',
    password: 'секрет'
}]

const initialUsersHashed = initialUsers.map(user => hashUser(user))

const validUserToAdd = {
    username: 'tourist',
    name: 'Gennady Korotkevich',
    password: 'super secret'
}

const validUserToAddHashed = hashUser(validUserToAdd)

const invalidUsernameUser = {
    username: 'to',
    name: 'Gennady Korotkevich',
    password: 'super secret'
}

const invalidPasswordUser = {
    username: 'tourist',
    name: 'Gennady Korotkevich',
    password: 'su'
}

const duplicateUsernameUser = {
    username: 'dannypa',
    name: 'Daniil Parniukov',
    password: 'секрет'
}

const noUsernameUser = {
    name: 'Gennady Korotkevich',
    password: 'super secret'
}

const noPasswordUser = {
    username: 'tourist',
    name: 'Gennady Korotkevich'
}

module.exports = {
    initialUsers,
    initialUsersHashed,
    validUserToAdd,
    validUserToAddHashed,
    invalidUsernameUser,
    invalidPasswordUser,
    duplicateUsernameUser,
    noUsernameUser,
    noPasswordUser,
    hashUser,
    isHashed,
    areEqual
}