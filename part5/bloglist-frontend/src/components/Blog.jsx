import { useState } from 'react'

const Blog = ({ blog }) => {

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
    const getDetails = () => showDetails ?
        <div>
            <p><a href={blog.url}>{blog.url}</a>, {blog.likes} likes</p>
            added by {blog.user.username} <br/>
        </div>
        : null

    const toggleDetails = () => setShowDetails(!showDetails)

    return (
        <div style={blogStyle}>
            <p>
                <b>{blog.title}</b> <br/> <i>by {blog.author + ' '}</i>
                <button onClick={toggleDetails}>{buttonLabel()}</button>
            </p>
            {getDetails()}
        </div>
    )
}

export default Blog