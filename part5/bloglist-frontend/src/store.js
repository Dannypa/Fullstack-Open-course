import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import blogsReducer from './reducers/blogsReducer.js'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        notification: notificationReducer,
    },
})

export default store
