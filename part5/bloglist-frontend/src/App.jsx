import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm.jsx'
import BlogList from './components/BlogList.jsx'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    return (
        <div>
            {user === null ?
                <LogInForm setUser={setUser}/> :
                <BlogList name={user.name} blogs={blogs}/>}
        </div>
    )
}

export default App