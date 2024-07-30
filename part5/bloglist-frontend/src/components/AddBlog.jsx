import { useRef } from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({ token, handleCreate }) => {
    const title = useRef('')
    const author = useRef('')
    const url = useRef('')


    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={event => handleCreate(event, title, author, url, token)}>
                <p>title: <input onChange={({ target }) => title.current = target.value} className={'titleInput'}/></p>
                <p>author: <input onChange={({ target }) => author.current = target.value} className={'authorInput'}/></p>
                <p>url: <input onChange={({ target }) => url.current = target.value} className={'urlInput'}/></p>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

AddBlog.propTypes = {
    token: PropTypes.string.isRequired,
    handleCreate: PropTypes.func.isRequired
}

export default AddBlog