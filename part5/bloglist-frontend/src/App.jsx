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
import BlogPage from './components/BlogPage.jsx'
import { Container, Typography } from '@mui/material'

const App = () => {
    const dispatch = useDispatch()
    const loggedUser = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(reloadBlogs())
    }, [])

    useEffect(() => {
        dispatch(setUser(JSON.parse(window.localStorage.getItem('user'))))
    }, [])

    const match = useMatch('/blogs/:id')
    const urlBlog = match
        ? blogs.find(b => {
              return b.id === match.params.id
          })
        : null

    return (
        <Container>
            <Typography variant={'h2'} gutterBottom>
                BlogList
            </Typography>
            <Notification />

            <Routes>
                <Route path={'/'} element={loggedUser === null ? <LogInForm /> : <BlogList />} />
                <Route path={'/users'} element={<UserList />} />
                <Route path={'/users/:id'} element={<UserPage />} />
                <Route path={'/blogs/:id'} element={<BlogPage blog={urlBlog} />} />
            </Routes>
        </Container>
    )
}

export default App
