import { useState } from "react"
import AddContact from "./components/AddContact"
import SearchBar from "./components/SearchBar"
import ContactList from "./components/ContactList"

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [filter, setFilter] = useState("")

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
