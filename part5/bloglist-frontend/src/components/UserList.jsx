import userService from '../services/users.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserFormatter = ({ user }) => {
    return (
        <>
            <Link to={`/users/${user.id}`}>
                <strong>{user.name}</strong>
            </Link>{' '}
            aka <i>{user.username}</i> created {user.blogs.length} blogs. <br />
        </>
    )
}

const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(result => setUsers(result))
    }, [])

    return (
        <div>
            <h2>Users</h2>
            {users.map(user => (
                <li key={user.username}>
                    <UserFormatter user={user} />
                </li>
            ))}
        </div>
    )
}

export default UserList
