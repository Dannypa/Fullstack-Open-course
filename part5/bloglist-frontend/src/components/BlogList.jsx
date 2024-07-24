import Blog from './Blog.jsx'
import blogService from '../services/blogs.js'
import { useRef } from 'react'
import AddBlogComponent from './AddBlogComponent.jsx'
import Togglable from './Togglable.jsx'

const BlogList = ({ name, blogs, reloadBlogs, user, setUser, handleNotificationChange }) => {
    const handleLogOut = () => {
        delete window.localStorage.user
        setUser(null)
        handleNotificationChange('Successfully logged out.')
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p>
                <i>You are logged in as {`${name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p> <br />
            <Togglable label={'create a blog'}>
                <AddBlogComponent token={user.token} {...{ reloadBlogs, handleNotificationChange }}/>
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogList