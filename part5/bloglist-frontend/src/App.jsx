import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm.jsx'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)

    const handleNotificationChange = (message) => {
        setNotificationMessage(message)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const reloadBlogs = () => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
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
            <Notification message={notificationMessage}/>
            {user === null ?
                <Togglable label={'log in'}>
                    <LogInForm {...{ setUser, handleNotificationChange }}/>
                </Togglable> :
                <BlogList name={user.name} {...{ blogs, reloadBlogs, user, setUser, handleNotificationChange }} />}
        </div>
    )
}

export default App