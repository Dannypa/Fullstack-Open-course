import { useEffect, useState } from "react"
import AddContact from "./components/AddContact"
import SearchBar from "./components/SearchBar"
import ContactList from "./components/ContactList"
import axios from "axios"

const SERVER_URL = "http://localhost:3001/persons"

const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState("")

  // getting the data from the server
  useEffect(() => {
    console.log("effect")
    axios.get(SERVER_URL).then((response) => {
      console.log("promise fulfilled")
      setContacts(response.data)
    })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>

      <AddContact
        {...{
          contacts: contacts,
          setContacts: setContacts,
        }}
      />

      <h2>Contacts</h2>

      <SearchBar setFilter={setFilter} />

      <ContactList contacts={contacts} filter={filter} />
    </div>
  )
}

export default App
