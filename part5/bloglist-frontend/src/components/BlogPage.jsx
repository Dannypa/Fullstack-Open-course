import BlogDetails from './BlogDetails.jsx'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const BlogPage = ({ blog }) => {
    if (!blog) return null

    return (
        <Typography component={'span'}>
            <h2>{blog.title}</h2>{' '}
            <h4>
                <i>by {blog.author + ' '}</i>
            </h4>
            <BlogDetails blog={blog} />
        </Typography>
    )
}

BlogPage.propTypes = {
    blog: PropTypes.object,
}

export default BlogPage
