require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const BLOG_URL = '/api/blogs'
const USER_URL = '/api/users'
const SALT_ROUNDS = 10

module.exports = {
    MONGODB_URI,
    PORT,
    BLOG_URL,
    USER_URL,
    SALT_ROUNDS
}