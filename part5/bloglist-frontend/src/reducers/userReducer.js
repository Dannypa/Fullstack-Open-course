import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login.js'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const login = (username, password, onSuccess = () => {}, onFail = () => {}) => {
    return dispatch => {
        loginService
            .login({ username, password })
            .then(result => {
                if (!result.token) {
                    console.log('invalid credentials') // todo: idk? can this even happen?
                    return
                }
                dispatch(setUser(result)) // only if successful
                onSuccess(result)
            })
            .catch(err => onFail(err))
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
