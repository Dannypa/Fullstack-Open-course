import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            // lets make it so that action.payload stores message and style
            return action.payload
        },
    },
})

const { setNotification } = notificationSlice.actions

export const notify = (message, style) => {
    return dispatch => {
        dispatch(setNotification({ message, style }))
        setTimeout(() => {
            dispatch(setNotification({ message: null, style: null }))
        }, 5000)
    }
}
export default notificationSlice.reducer
