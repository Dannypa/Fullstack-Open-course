import {useNotificationValue} from "../NotificationContext.jsx"

const Notification = () => {
  const notificationText = useNotificationValue()

  if (notificationText === null) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={style}>
      {notificationText}
    </div>
  )
}

export default Notification
