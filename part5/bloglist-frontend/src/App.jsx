import { useEffect } from 'react'
import LogInForm from './components/LogInForm.jsx'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { reloadBlogs } from './reducers/blogsReducer.js'
import { setUser } from './reducers/userReducer.js'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import UserList from './components/UserList.jsx'
import UserPage from './components/UserPage.jsx'

const App = () => {
    const dispatch = useDispatch()
    const loggedUser = useSelector(state => state.user)

    useEffect(() => {
        dispatch(reloadBlogs())
    }, [])

    useEffect(() => {
        dispatch(setUser(JSON.parse(window.localStorage.getItem('user'))))
    }, [])

    return (
        <div>
            <h1>BlogList</h1>
            <Notification />

            <Routes>
                <Route path={'/'} element={loggedUser === null ? <LogInForm /> : <BlogList />} />
                <Route path={'/users'} element={<UserList />} />
                <Route path={'/users/:id'} element={<UserPage />} />
            </Routes>
        </div>
    )
}

export default App
