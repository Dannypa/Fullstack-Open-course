import { useRef } from 'react'
import PropTypes from 'prop-types'
import { notify } from '../reducers/notificationReducer.js'
import { addBlog } from '../reducers/blogsReducer.js'
import { useDispatch } from 'react-redux'

const AddBlog = ({ token, selfToggleRef }) => {
    const title = useRef('')
    const author = useRef('')
    const url = useRef('')

    const dispatch = useDispatch()

    const onAdd = () => {
        selfToggleRef.current.toggleVisibility()
        dispatch(notify('Successfully added a blog!', 'success'))
    }

    const onFail = err => {
        console.log(err)
        dispatch(notify('Something went wrong.', 'error'))
    }

    const handleCreate = (event, title, author, url) => {
        event.preventDefault()
        dispatch(
            addBlog(
                {
                    title: title.current,
                    author: author.current,
                    url: url.current,
                },
                token,
                onAdd,
                onFail,
            ),
        )
        title.current = ''
        author.current = ''
        url.current = ''
        event.target.reset()
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={event => handleCreate(event, title, author, url)}>
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
    selfToggleRef: PropTypes.object.isRequired,
}

export default AddBlog
