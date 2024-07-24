import { useRef } from 'react'
import blogService from '../services/blogs.js'

const AddBlogComponent = ({ token, onAdd, onFail }) => {
    const title = useRef('')
    const author = useRef('')
    const url = useRef('')

    const handleCreate = (event) => {
        event.preventDefault()

        blogService
            .addNew({
                title: title.current,
                author: author.current,
                url: url.current
            }, token)
            .then(_ => {
                onAdd()
            })
            .catch(err => {
                onFail(err)
            }).finally(() => {
                title.current = ''
                author.current = ''
                url.current = ''
                event.target.reset()
            })
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={handleCreate}>
                <p>title: <input onChange={({ target }) => title.current = target.value}/></p>
                <p>author: <input onChange={({ target }) => author.current = target.value}/></p>
                <p>url: <input onChange={({ target }) => url.current = target.value}/></p>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AddBlogComponent