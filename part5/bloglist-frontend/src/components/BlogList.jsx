import Blog from './Blog.jsx'
import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'

// todo: remove unnecessary name prop
const BlogList = ({ blogs, user, setUser }) => {
    const addBlogRef = useRef()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        delete window.localStorage.user
        setUser(null)
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
                <Blog key={blog.id} {...{ user, blog }} />
            ))}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default BlogList
