const Notification = ({ message, type = "success" }) => {
  if (message === null) {
    return null
  }
  var notificationStyle = {}
  if (type === "success") {
    notificationStyle = {
      background: "#00ff00",
      color: "white",
      textShadow: "1px 1px 2px black",
      border: "1px inset black",
      fontSize: "18px",
      fontWeight: "bold",
    }
  } else {
    notificationStyle = {
      background: "red",
      color: "white",
      textShadow: "1px 1px 2px black",
      border: "1px inset black",
      fontSize: "18px",
      fontWeight: "bold",
    }
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
