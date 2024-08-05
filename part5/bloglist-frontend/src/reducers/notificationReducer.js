import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
    },
})

const { setNotification } = notificationSlice.actions

export const notify = message => {
    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)
    }
}
export default notificationSlice.reducer
