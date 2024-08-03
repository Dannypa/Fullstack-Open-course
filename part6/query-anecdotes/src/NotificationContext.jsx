import {createContext, useContext, useReducer} from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'REMOVE':
            return null
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>
}

export const useNotificationValue = () => useContext(NotificationContext)[0]

export const useNotificationDispatch = () => useContext(NotificationContext)[1]

export const showNotification = (dispatch, notificationText, timeout) => {
    dispatch({type: 'SET', payload: notificationText})
    setTimeout(() => dispatch({type: 'REMOVE'}), timeout)
}

export default NotificationContext