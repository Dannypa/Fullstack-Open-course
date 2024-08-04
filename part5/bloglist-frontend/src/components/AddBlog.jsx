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
                <p>
                    title:{' '}
                    <input
                        onChange={({ target }) => (title.current = target.value)}
                        className={'titleInput'}
                        data-testid={'blog-title-input'}
                    />
                </p>
                <p>
                    author:{' '}
                    <input
                        onChange={({ target }) => (author.current = target.value)}
                        className={'authorInput'}
                        data-testid={'blog-author-input'}
                    />
                </p>
                <p>
                    url:{' '}
                    <input
                        onChange={({ target }) => (url.current = target.value)}
                        className={'urlInput'}
                        data-testid={'blog-url-input'}
                    />
                </p>
                <button type='submit' data-testid={'create-blog-button'}>
                    create
                </button>
            </form>
        </div>
    )
}

AddBlog.propTypes = {
    token: PropTypes.string.isRequired,
    handleCreate: PropTypes.func.isRequired,
}

export default AddBlog
