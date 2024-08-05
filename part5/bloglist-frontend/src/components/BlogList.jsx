import Blog from './Blog.jsx'
import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer.js'
import { addBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer.js'

const BlogList = ({ name, blogs, user, setUser }) => {
    const addBlogRef = useRef()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        delete window.localStorage.user
        setUser(null)
        dispatch(notify('Successfully logged out.'))
    }

    const onAdd = () => {
        addBlogRef.current.toggleVisibility()
        dispatch(notify('Successfully added a blog!'))
    }

    const onFail = err => {
        console.log(err)
        dispatch(notify('Something went wrong.'))
    }

    const handleLikeIncrease = blog => {
        // todo: one like per person
        dispatch(likeBlog(blog))
    }

    const handleDelete = blog => {
        if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
            dispatch(deleteBlog(blog.id, user.token))
        }
    }

    const handleCreate = (event, title, author, url) => {
        event.preventDefault()
        dispatch(
            addBlog(
                {
                    title: title.current,
                    author: author.current,
                    url: url.current,
                },
                user.token,
                onAdd,
                onFail,
            ),
        )
        title.current = ''
        author.current = ''
        url.current = ''
        event.target.reset()
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p data-testid={'logged-user-name'}>
                <i>You are logged in as {`${name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p>{' '}
            <br />
            <Togglable label={'create a blog'} ref={addBlogRef}>
                <AddBlog token={user.token} {...{ handleCreate }} />
            </Togglable>
            {blogs.map(blog => (
                <Blog key={blog.id} {...{ user, blog, handleLikeIncrease, handleDelete }} />
            ))}
        </div>
    )
}

BlogList.propTypes = {
    name: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default BlogList
