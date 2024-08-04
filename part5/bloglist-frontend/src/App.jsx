import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm.jsx'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const notificationMessage = useSelector(state => state.notification)

    const handleNotificationChange = message => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)
    }

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
            <Notification message={notificationMessage} />
            {user === null ? (
                // <Togglable label={'log in'}>
                <LogInForm {...{ setUser, handleNotificationChange }} />
            ) : (
                // </Togglable>
                <BlogList name={user.name} {...{ blogs, reloadBlogs, user, setUser, handleNotificationChange }} />
            )}
        </div>
    )
}

export default App
