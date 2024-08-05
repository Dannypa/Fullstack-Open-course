import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm.jsx'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const reloadBlogs = () => {
        blogService.getAll().then(blogs => setBlogs(blogs.toSorted((a, b) => -a.likes + b.likes)))
    }

    useEffect(() => {
        reloadBlogs()
    }, [])

    useEffect(() => {
        console.log(JSON.parse(window.localStorage.getItem('user')))
        setUser(JSON.parse(window.localStorage.getItem('user')))
    }, [])

    return (
        <div>
            <Notification />
            {user === null ? (
                // <Togglable label={'log in'}>
                <LogInForm {...{ setUser }} />
            ) : (
                // </Togglable>
                <BlogList name={user.name} {...{ blogs, reloadBlogs, user, setUser }} />
            )}
        </div>
    )
}

export default App
