import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const LogInForm = ({ setUser }) => {
    const username = useRef('')
    const setUsername = (value) => {
        username.current = value
    }
    const password = useRef('')
    const setPassword = (value) => password.current = value

    const handleSubmit = (event) => {
        event.preventDefault()
        setUser({ name: 'Ivan' })
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

const BlogList = ({ name, blogs }) => {
    return (
        <div>
            <h2>blogs</h2>
            <p><i>You are logged in as {name}.</i></p> <br />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}




const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    return (
        <div>
            {user === null ?
                <LogInForm setUser={setUser}/> :
                <BlogList name={user.name} blogs={blogs}/>}
        </div>
    )
}

export default App