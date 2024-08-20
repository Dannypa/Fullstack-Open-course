import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'
import { setUser } from '../reducers/userReducer.js'
import { Link as RouterLink } from 'react-router-dom'
import {
    AppBar,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
    Typography,
    Link as MuiLink,
} from '@mui/material'

const BlogPreview = ({ blog }) => {
    return (
        <Typography>
            <MuiLink component={RouterLink} to={`/blogs/${blog.id}`} color={'inherit'}>
                <b>{blog.title}</b>
            </MuiLink>
            <br /> <i>by {blog.author}</i>
        </Typography>
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
                    <Button to={'/'} color={'inherit'} component={RouterLink}>
                        home
                    </Button>
                    <Button to={'/users'} color={'inherit'} component={RouterLink}>
                        users
                    </Button>
                </Toolbar>
            </AppBar>
            <p data-testid={'logged-user-name'}>
                <Typography component={'span'}>
                    <i>You are logged in as {`${user.name}.`} </i> <br />
                </Typography>
                <Button color={'inherit'} variant={'contained'} onClick={handleLogOut} style={{ marginTop: 10 }}>
                    log out
                </Button>
            </p>
            <br />
            <Togglable label={'create a blog'} ref={addBlogRef}>
                <AddBlog token={user.token} selfToggleRef={addBlogRef} />
            </Togglable>
            <TableContainer component={Paper} style={{ marginTop: 10 }}>
                <Table>
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
