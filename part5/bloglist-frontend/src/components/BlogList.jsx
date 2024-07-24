import Blog from './Blog.jsx'
import blogService from '../services/blogs.js'
import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'

const BlogList = ({ name, blogs, reloadBlogs, user, setUser, handleNotificationChange }) => {
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
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogList