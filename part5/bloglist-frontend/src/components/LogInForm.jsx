import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'
import { login } from '../reducers/userReducer.js'
import { Button, TextField } from '@mui/material'

const LogInForm = () => {
    const username = useRef('')
    const setUsername = value => {
        username.current = value
    }
    const password = useRef('')
    const setPassword = value => (password.current = value)
    const dispatch = useDispatch()

    const handleSubmit = async event => {
        event.preventDefault()
        dispatch(
            login(
                username.current,
                password.current,
                result => {
                    window.localStorage.setItem('user', JSON.stringify(result))
                    dispatch(notify('Successfully logged in!'))
                },
                err => {
                    console.log(err)
                    dispatch(notify('Wrong username or password!'))
                },
            ),
        )
    }

    const passwordChange = event => {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

    // todo: change to uncontrolled forms
    return (
        <div data-testid={'login-form'}>
            <h2>log in to the application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label={'username'}
                        data-testid={'username-input'}
                        type='text'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <br />
                <div>
                    <TextField
                        label={'password'}
                        data-testid={'password-input'}
                        type='password'
                        onChange={passwordChange}
                    />
                </div>
                <br />
                <Button variant='contained' color='primary' data-testid={'login-button'} type='submit'>
                    log in
                </Button>
            </form>
        </div>
    )
}

export default LogInForm
