import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer.js'
import { useDispatch, useSelector } from 'react-redux'

const BlogDetails = ({ blog }) => {
    // todo: notifications
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLikeIncrease = blog => {
        // todo: one like per person
        dispatch(likeBlog(blog))
    }

    const handleDelete = blog => {
        if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
            dispatch(deleteBlog(blog.id, user.token))
        }
    }

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
}

export default BlogDetails
