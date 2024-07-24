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

export default BlogDetails