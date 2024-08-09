import userService from '../services/users.js'
import { useEffect, useState } from 'react'
import UserInfo from './UserInfo.jsx'

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
                    <UserInfo user={user} />
                </li>
            ))}
        </div>
    )
}

export default UserList
