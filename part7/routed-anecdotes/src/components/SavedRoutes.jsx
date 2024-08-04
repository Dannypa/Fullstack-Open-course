import { Route, Routes, useMatch } from 'react-router-dom'
import CreateNew from './CreateNew.jsx'
import About from './About.jsx'
import AnecdoteList from './AnecdoteList.jsx'
import Anecdote from './AnecdoteDetails.jsx'

const SavedRoutes = ({ anecdotes, addNew }) => {
    const match = useMatch('/anecdotes/:id')
    const anecdote = match
        ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
        : null

    return <Routes>
        <Route path={'/anecdotes/:id'} element={<Anecdote anecdote={anecdote}/>}></Route>
        <Route path={'/'} element={<AnecdoteList anecdotes={anecdotes}/>}></Route>
        <Route path={'/create'} element={<CreateNew addNew={addNew}/>}></Route>
        <Route path={'/about'} element={<About />}></Route>
    </Routes>
}

export default SavedRoutes