import { useEffect, useState } from "react"
import AddContact from "./components/AddContact"
import SearchBar from "./components/SearchBar"
import ContactList from "./components/ContactList"
import axios from "axios"
import contactService from "./services/contacts"
import Notification from "./components/Notification"

const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)

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
      <Notification message={notification} />

      <h1>Phonebook</h1>

      <AddContact
        {...{
          contacts,
          setContacts,
          setNotification,
        }}
      />

      <h2>Contacts</h2>

      <SearchBar setFilter={setFilter} />

      <ContactList {...{ contacts, setContacts, filter }} />
    </div>
  )
}

export default App
