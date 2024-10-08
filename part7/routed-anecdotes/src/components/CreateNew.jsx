import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index.js'

const CreateNew = (props) => {
    const content = useField('type')
    const author = useField('type')
    const info = useField('type')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form
                onSubmit={handleSubmit}
                onReset={() => [content, author, info].forEach(c => c.onReset())}
            >
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button>create</button> {' '}
                <button type='reset'>reset</button>
            </form>
        </div>
    )
}

export default CreateNew