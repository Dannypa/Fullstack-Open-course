import { useState } from 'react'
import blogService from '../services/blogs.js'

const BlogDetails = ({ blog, reloadBlogs, user }) => {
    // todo: notifications

    const handleLikeIncrease = () => { // todo: one like per person
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

    const handleDelete = () => {
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

    const deleteButton = () => (user.username === blog.user.username) ?
        <button onClick={handleDelete}>delete blog</button>
        : null

    return (
        <div>
            <p><a href={blog.url}>{blog.url}</a>, {blog.likes} likes <button onClick={handleLikeIncrease}>like</button></p>
            <i>added by {blog.user.username} </i> <br/>
            {deleteButton()}
        </div>
    )
}


const Blog = (props) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 10
    }

    const [showDetails, setShowDetails] = useState(false)
    const buttonLabel = () => showDetails ? 'hide' : 'view'
    const getDetails = () => showDetails ? <BlogDetails {...props}/> : null

    const toggleDetails = () => setShowDetails(!showDetails)

    return (
        <div style={blogStyle}>
            <p>
                <b>{props.blog.title}</b> <br/> <i>by {props.blog.author + ' '}</i>
                <button onClick={toggleDetails}>{buttonLabel()}</button>
            </p>
            {getDetails()}
        </div>
    )
}

export default Blog