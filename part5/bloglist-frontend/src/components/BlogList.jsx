import Blog from './Blog.jsx'
import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import PropTypes from 'prop-types'

const BlogList = ({
    name,
    blogs,
    reloadBlogs,
    user,
    setUser,
    handleNotificationChange
}) => {
    const addBlogRef = useRef()

    const handleLogOut = () => {
        delete window.localStorage.user
        setUser(null)
        handleNotificationChange('Successfully logged out.')
    }

    const onAdd = () => {
        reloadBlogs()
        addBlogRef.current.toggleVisibility()
        handleNotificationChange('Successfully added a blog!')
    }

    const onFail = (err) => {
        console.log(err)
        handleNotificationChange('Something went wrong.')
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p>
                <i>You are logged in as {`${name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p> <br />
            <Togglable label={'create a blog'} ref={addBlogRef}>
                <AddBlog token={user.token} {...{ onAdd, onFail }}/>
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id} {...{ user, blog, reloadBlogs }} />
            )}
        </div>
    )
}

BlogList.propTypes = {
    name: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired,
    reloadBlogs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    handleNotificationChange: PropTypes.func.isRequired
}

export default BlogList