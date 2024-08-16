import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
    const { message, style } = useSelector(state => state.notification)

    if (message === null) {
        return null
    }
    return (
        <div>
            {message && (
                <Alert severity={style}>
                    <b>{message}</b>
                </Alert>
            )}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
}

export default Notification
