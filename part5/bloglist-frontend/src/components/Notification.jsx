const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return <div><b>{message}</b></div>
}

export default Notification