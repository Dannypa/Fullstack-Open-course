import { Route, Routes } from 'react-router-dom'
import CreateNew from './CreateNew.jsx'
import About from './About.jsx'
import AnecdoteList from './AnecdoteList.jsx'

const SavedRoutes = ({ anecdotes, addNew }) => {
    return <Routes>
        <Route path={'/'} element={<AnecdoteList anecdotes={anecdotes}/>}></Route>
        <Route path={'/create'} element={<CreateNew addNew={addNew}/>}></Route>
        <Route path={'/about'} element={<About />}></Route>
    </Routes>
}

export default SavedRoutes