import Blog from './Blog.jsx'
import blogService from '../services/blogs.js'
import { useRef } from 'react'
import AddBlogComponent from './AddBlogComponent.jsx'

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
            <AddBlogComponent token={user.token} {...{ reloadBlogs, handleNotificationChange }}/>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogList