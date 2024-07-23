import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm.jsx'
import BlogList from './components/BlogList.jsx'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const reloadBlogs = () => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }

    useEffect(() => {
        reloadBlogs()
    }, [])

    useEffect(() => {
        console.log(JSON.parse(window.localStorage.getItem('user')))
        setUser(JSON.parse(window.localStorage.getItem('user')))
    }, [])

    return (
        <div>
            {user === null ?
                <LogInForm setUser={setUser}/> :
                <BlogList name={user.name} {...{ blogs, reloadBlogs, user, setUser }} />}
        </div>
    )
}

export default App