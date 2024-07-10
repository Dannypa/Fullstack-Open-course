const Notification = ({ message, className = "success" }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    background: "#00ff00",
    color: "white",
    textShadow: "1px 1px 2px black",
    border: "1px inset black",
    fontSize: "18px",
    fontWeight: "bold",
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
