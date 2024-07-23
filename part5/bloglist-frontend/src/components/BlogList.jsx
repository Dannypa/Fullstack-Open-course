import Blog from './Blog.jsx'

const BlogList = ({ name, blogs, setUser }) => {
    const handleLogOut = () => {
        delete window.localStorage.user
        setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>
                <i>You are logged in as {`${name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p> <br />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogList