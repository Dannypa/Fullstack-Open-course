import { useEffect, useState } from "react"
import AddContact from "./components/AddContact"
import SearchBar from "./components/SearchBar"
import ContactList from "./components/ContactList"
import contactService from "./services/contacts"
import Notification from "./components/Notification"

const App = () => {
  // console.log("Rerendered!!!! AAAAAAAAAAAAAAAAAAA")
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState("success")

  // getting the data from the server
  useEffect(() => {
    console.log("effect")
    contactService.getAll().then((response) => {
      console.log("promise fulfilled")
      setContacts(response)
    })
  }, [])

  return (
    <div>
      <Notification message={notification} type={notificationType} />

      <h1>Phonebook</h1>

      <AddContact
        {...{
          contacts,
          setContacts,
          setNotification,
          setNotificationType,
        }}
      />

      <h2>Contacts</h2>

      <SearchBar setFilter={setFilter} />

      <ContactList {...{ contacts, setContacts, filter }} />
    </div>
  )
}

export default App
