const Notification = ({ notificationText }) => {
    if (notificationText === null) return null
    return <div>{notificationText}</div>
}

export default Notification