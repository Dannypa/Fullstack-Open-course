import { useState, useEffect } from 'react'
import LogInForm from './components/LogInForm.jsx'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { reloadBlogs } from './reducers/blogsReducer.js'

const App = () => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(reloadBlogs())
    }, [])

    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log(JSON.parse(window.localStorage.getItem('user')))
        setUser(JSON.parse(window.localStorage.getItem('user')))
    }, [])

    return (
        <div>
            <Notification />
            {user === null ? (
                <LogInForm {...{ setUser }} />
            ) : (
                <BlogList name={user.name} {...{ blogs, user, setUser }} />
            )}
        </div>
    )
}

export default App
