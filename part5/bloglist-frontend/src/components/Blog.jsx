import { useState } from 'react'
import BlogDetails from './BlogDetails.jsx'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 10,
    }

    const [showDetails, setShowDetails] = useState(false)
    const buttonLabel = () => (showDetails ? 'hide' : 'view')
    const getDetails = () => (showDetails ? <BlogDetails blog={blog} /> : null)

    const toggleDetails = () => setShowDetails(!showDetails)

    return (
        <div style={blogStyle}>
            <p>
                <b>{blog.title}</b> <br /> <i>by {blog.author + ' '}</i>
                <button onClick={toggleDetails}>{buttonLabel()}</button>
            </p>
            {getDetails()}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Blog
