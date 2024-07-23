import Blog from './Blog.jsx'

const BlogList = ({ name, blogs }) => {
    return (
        <div>
            <h2>blogs</h2>
            <p><i>You are logged in as {name}.</i></p> <br />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default { BlogList }