import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return <div><b>{message}</b></div>
}

Notification.propTypes = {
    message: PropTypes.string.isRequired
}

export default Notification