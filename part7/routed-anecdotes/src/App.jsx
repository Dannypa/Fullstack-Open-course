import { useState } from 'react'
import Menu from './Menu.jsx'
import Footer from './components/Footer.jsx'
import SavedRoutes from './components/SavedRoutes.jsx'
import Notification from './components/Notification.jsx'


const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))

        setNotification(`an anecdote '${anecdote.content}' created!`)
        setTimeout(() => setNotification(null), 5000)
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notificationText={notification}/>
            <SavedRoutes {...{ anecdotes, addNew }}/>
            <Footer />
        </div>
    )
}

export default App
