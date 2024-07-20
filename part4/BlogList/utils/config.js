require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const BASE_URL = '/api/blogs'

module.exports = {
    MONGODB_URI,
    PORT,
    BASE_URL
}