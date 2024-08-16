import PropTypes from 'prop-types'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer.js'
import { useDispatch, useSelector } from 'react-redux'

const CommentSection = ({ blog }) => {
    const dispatch = useDispatch()
    const handleSubmit = event => {
        event.preventDefault()
        console.log(event.target.comment.value)
        dispatch(commentBlog(blog.id, event.target.comment.value))
        event.target.reset()
    }

    return (
        <>
            <h2>Comments</h2>

            <form onSubmit={handleSubmit}>
                <input name={'comment'} /> <button type={'submit'}>comment</button>
            </form>

            <ul>
                {blog.comments.map(comment => (
                    <li key={comment.id}>{comment.body}</li> // bad. comments are not at all unique; ill try to store ids in the database
                ))}
            </ul>
        </>
    )
}

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
    console.log(user.username, 'user')
    console.log(blog.user.username, 'user blog')
    return (
        <div>
            <p>
                <a href={blog.url}>{blog.url}</a> <br />
                {blog.likes} likes{' '}
                <button className={'likeButton'} onClick={() => handleLikeIncrease(blog)}>
                    like
                </button>
            </p>
            <i>added by {blog.user.username} </i> <br /> <br />
            <CommentSection blog={blog} />
            {deleteButton()}
        </div>
    )
}

BlogDetails.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default BlogDetails
