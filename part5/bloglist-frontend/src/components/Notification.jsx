import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.notification)

    if (message === null) {
        return null
    }
    return (
        <div>
            <b>{message}</b>
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
}

export default Notification
