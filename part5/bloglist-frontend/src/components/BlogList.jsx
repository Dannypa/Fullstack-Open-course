import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'
import { setUser } from '../reducers/userReducer.js'
import { Link } from 'react-router-dom'
import { AppBar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar } from '@mui/material'

const BlogPreview = ({ blog }) => {
    return (
        <p>
            <Link to={`/blogs/${blog.id}`}>
                <b>{blog.title}</b>
            </Link>{' '}
            <br /> <i>by {blog.author + ' '}</i>
        </p>
    )
}

const BlogList = () => {
    const addBlogRef = useRef()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const handleLogOut = () => {
        delete window.localStorage.user
        dispatch(setUser(null))
        dispatch(notify('Successfully logged out.', 'success'))
    }

    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar>
                    <Button to={'/'} color={'inherit'} component={Link}>
                        home
                    </Button>
                    <Button to={'/users'} color={'inherit'} component={Link}>
                        users
                    </Button>
                </Toolbar>
            </AppBar>
            <p data-testid={'logged-user-name'}>
                <i>You are logged in as {`${user.name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p>{' '}
            <br />
            <Togglable label={'create a blog'} ref={addBlogRef}>
                <AddBlog token={user.token} selfToggleRef={addBlogRef} />
            </Togglable>
            <TableContainer component={Paper} style={{ marginTop: 10 }}>
                {' '}
                <Table>
                    {' '}
                    <TableBody>
                        {blogs.map(blog => (
                            <TableRow key={blog.id}>
                                <TableCell>
                                    <BlogPreview blog={blog} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BlogList
