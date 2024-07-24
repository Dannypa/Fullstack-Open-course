import { useState } from 'react'
import BlogDetails from './BlogDetails.jsx'

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