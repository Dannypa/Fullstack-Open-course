import BlogDetails from './BlogDetails.jsx'
import PropTypes from 'prop-types'

const BlogPage = ({ blog }) => {
    if (!blog) return null

    return (
        <div>
            <h2>{blog.title}</h2>{' '}
            <h4>
                <i>by {blog.author + ' '}</i>
            </h4>
            <BlogDetails blog={blog} />
        </div>
    )
}

BlogPage.propTypes = {
    blog: PropTypes.object,
}

export default BlogPage
