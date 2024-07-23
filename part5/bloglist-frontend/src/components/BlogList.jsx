import Blog from './Blog.jsx'
import blogService from '../services/blogs.js'
import { useRef } from 'react'


const AddBlogComponent = ({ token, reloadBlogs }) => {
    const title = useRef('')
    const author = useRef('')
    const url = useRef('')

    const handleCreate = (event) => {
        event.preventDefault()

        blogService
            .addNew({
                title: title.current,
                author: author.current,
                url: url.current
            }, token)
            .then(_ => reloadBlogs())
            .catch(err => {
                console.log(err)
            }).finally(() => {
                title.current = ''
                author.current = ''
                url.current = ''
                event.target.reset()
            })
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={handleCreate}>
                <p>title: <input onChange={({ target }) => title.current = target.value}/></p>
                <p>author: <input onChange={({ target }) => author.current = target.value}/></p>
                <p>url: <input onChange={({ target }) => url.current = target.value}/></p>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const BlogList = ({ name, blogs, reloadBlogs, user, setUser }) => {
    const handleLogOut = () => {
        delete window.localStorage.user
        setUser(null)
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p>
                <i>You are logged in as {`${name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p> <br />
            <AddBlogComponent token={user.token} reloadBlogs={reloadBlogs}/>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogList