import Blog from './Blog.jsx'
import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'
import { setUser } from '../reducers/userReducer.js'

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
            <h2>Blogs</h2>
            <p data-testid={'logged-user-name'}>
                <i>You are logged in as {`${user.name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p>{' '}
            <br />
            <Togglable label={'create a blog'} ref={addBlogRef}>
                <AddBlog token={user.token} selfToggleRef={addBlogRef} />
            </Togglable>
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default BlogList
