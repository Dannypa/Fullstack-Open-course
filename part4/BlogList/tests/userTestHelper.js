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
},
{
    username: 'xxx_dominator_xxx',
    name: 'Will French',
    password: '123 damn that\'s so not secure'
}
]

const theAuthor = initialUsers[0]

const initialUsersHashed = initialUsers.map(user => hashUser(user))

const initialUsersInDb = [
    { '_id':'669d316bcddca562b5a0d38a',
        'username':'dannypa',
        'name':'Daniil Parniukov',
        'passwordHash':'$2b$10$0lNNJXkA7PPFthdpU7NsJed3ty3y75oS3Rd9k3x0SZhhKLzcO8LGW',
        // 'blogs':[],
    },
    { '_id':'669d316bcddca562b5a0d38b',
        'username':'xxx_dominator_xxx',
        'name':'Will French',
        'passwordHash':'$2b$10$As1ZdN5yXM247yFAI0toZ.Dd6HgyNEi2vWa3sJ4Z/RJLrWJWkKcZm',
        // 'blogs':[]
    }
]

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
    initialUsersInDb,
    initialUsersHashed,
    validUserToAdd,
    validUserToAddHashed,
    invalidUsernameUser,
    invalidPasswordUser,
    duplicateUsernameUser,
    noUsernameUser,
    noPasswordUser,
    theAuthor,
    hashUser,
    isHashed,
    areEqual
}