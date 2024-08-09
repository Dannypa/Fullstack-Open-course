import { useParams } from 'react-router-dom'
import userService from '../services/users.js'
import { useEffect, useState } from 'react'

const UserPage = () => {
    const id = useParams().id
    const [user, setUser] = useState(null)

    useEffect(() => {
        userService
            .getAll()
            .then(result => result.find(u => u.id.toString() === id))
            .then(u => setUser(u))
    }, [])

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>
                <i>also known as {user.username}</i>
            </h4>

            <h3>created blogs:</h3>
            {user.blogs.map(blog => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </div>
    )
}

export default UserPage
