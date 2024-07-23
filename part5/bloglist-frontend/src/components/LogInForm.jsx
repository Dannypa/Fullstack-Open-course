import { useRef } from 'react'
import loginService from '../services/login.js'

const LogInForm = ({ setUser }) => {
    const username = useRef('')
    const setUsername = (value) => {
        username.current = value
    }
    const password = useRef('')
    const setPassword = (value) => password.current = value

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const result = await loginService.login({
                username: username.current,
                password: password.current
            })

            if (!result.token) {
                console.log('invalid credentials')
                return
            }

            setUser(result)
        } catch (e) {
            console.log(e)
            console.log('invalid credentials')
        }
    }

    const passwordChange = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

    return (
        <div>
            <h2>log in to the application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username:{' '}
                    <input
                        type='text'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:{' '}
                    <input
                        name='Password'
                        type='text'
                        onChange={passwordChange}
                    />
                </div>
                <button type='submit'>log in</button>
            </form>
        </div>
    )
}

export default { LogInForm }