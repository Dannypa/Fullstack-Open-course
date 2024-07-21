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

const initialUsersHashed = [{
    username: 'dannypa',
    name: 'Daniil Parniukov',
    passwordHash: '$2b$10$Psn/MaT1X5NpHk/x/EVW8ulY0XHI3YOHvLvx7Vn2sheqn554urVWq'
}]

const validUserToAdd = {
    username: 'tourist',
    name: 'Gennady Korotkevich',
    password: 'super secret'
}

const validUserToAddHashed = hashUser(validUserToAdd)

module.exports = {
    initialUsers,
    initialUsersHashed,
    validUserToAdd,
    validUserToAddHashed,
    hashUser,
    isHashed,
    areEqual
}