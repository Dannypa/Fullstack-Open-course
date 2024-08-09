import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'
import { setUser } from '../reducers/userReducer.js'
import { Link } from 'react-router-dom'

const BlogPreview = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 10,
    }
    return (
        <p style={blogStyle}>
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
        dispatch(notify('Successfully logged out.'))
    }

    return (
        <div>
            <p data-testid={'logged-user-name'}>
                <i>You are logged in as {`${user.name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p>{' '}
            <br />
            <Togglable label={'create a blog'} ref={addBlogRef}>
                <AddBlog token={user.token} selfToggleRef={addBlogRef} />
            </Togglable>
            {blogs.map(blog => (
                <BlogPreview key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default BlogList
