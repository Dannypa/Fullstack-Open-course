import { useRef } from 'react'
import loginService from '../services/login.js'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'
import { setUser } from '../reducers/userReducer.js'

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

        try {
            // todo: move login to reducer file
            const result = await loginService.login({
                username: username.current,
                password: password.current,
            })

            if (!result.token) {
                console.log('invalid credentials')
                return
            }

            window.localStorage.setItem('user', JSON.stringify(result))
            dispatch(setUser(result))
            dispatch(notify('Successfully logged in!'))
        } catch (e) {
            console.log(e)
            dispatch(notify('Wrong username or password!'))
        }
    }

    const passwordChange = event => {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

    return (
        <div data-testid={'login-form'}>
            <h2>log in to the application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username:{' '}
                    <input
                        data-testid={'username-input'}
                        type='text'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password: <input data-testid={'password-input'} type='password' onChange={passwordChange} />
                </div>
                <button data-testid={'login-button'} type='submit'>
                    log in
                </button>
            </form>
        </div>
    )
}

export default LogInForm
