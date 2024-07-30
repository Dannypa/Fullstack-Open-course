import Blog from './Blog.jsx'
import { useRef } from 'react'
import AddBlog from './AddBlog.jsx'
import Togglable from './Togglable.jsx'
import PropTypes from 'prop-types'
import blogService from '../services/blogs.js'

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

    const handleLikeIncrease = blog => { // todo: one like per person
        blogService.changeBlog(blog.id, {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id
        }).then(
            result => {
                console.log(result)
                reloadBlogs() // slow. i don't like it. but probably the scenario is not realistic
            }
        ).catch(err => console.log(err))
    }

    const handleDelete = blog => {
        if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
            blogService.deleteBlog(blog.id, user.token)
                .then(result => {
                    console.log(result)
                    reloadBlogs()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const handleCreate = (event, title, author, url, token) => {
        event.preventDefault()
        blogService
            .addNew({
                title: title.current,
                author: author.current,
                url: url.current
            }, token)
            .then(_ => {
                onAdd()
            })
            .catch(err => {
                onFail(err)
            }).finally(() => {
                title.current = ''
                author.current = ''
                url.current = ''
                event.target.reset()
            })
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p data-testid={'logged-user-name'}>
                <i>You are logged in as {`${name}. `}</i>
                <button onClick={handleLogOut}>log out</button>
            </p> <br />
            <Togglable label={'create a blog'} ref={addBlogRef}>
                <AddBlog token={user.token} {...{ handleCreate }}/>
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id} {...{ user, blog, handleLikeIncrease, handleDelete }} />
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