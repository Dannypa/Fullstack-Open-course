import PropTypes from 'prop-types'

const BlogDetails = ({ blog, user, handleLikeIncrease, handleDelete }) => {
    // todo: notifications

    const deleteButton = () =>
        user.username === blog.user.username ? <button onClick={() => handleDelete(blog)}>delete blog</button> : null

    return (
        <div>
            <p>
                <a href={blog.url}>{blog.url}</a>, {blog.likes} likes
                <button className={'likeButton'} onClick={() => handleLikeIncrease(blog)}>
                    like
                </button>
            </p>
            <i>added by {blog.user.username} </i> <br />
            {deleteButton()}
        </div>
    )
}

BlogDetails.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleLikeIncrease: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default BlogDetails
