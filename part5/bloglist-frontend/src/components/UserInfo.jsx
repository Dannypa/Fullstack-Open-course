const UserInfo = ({ user }) => {
    return (
        <span>
            <strong>{user.name}</strong> aka <i>{user.username}</i> created {user.blogs.length} blogs. <br />
        </span>
    )
}

export default UserInfo
