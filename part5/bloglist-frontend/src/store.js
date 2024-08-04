import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer.js'

const store = configureStore({
    reducer: {
        notification: notificationSlice,
    },
})

export default store
