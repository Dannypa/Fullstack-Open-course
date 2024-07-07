import { useState } from "react"
import { Fragment } from "react"

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  var currentName = "" // why do we need states for this?
  const setCurrentName = (newName) => (currentName = newName)
  var currentNumber = ""
  const setCurrentNumber = (newNumber) => (currentNumber = newNumber)
  const [filter, setFilter] = useState("")

  const addName = (event) => {
    event.preventDefault()

    if (contacts.map((contact) => contact.name).includes(currentName)) {
      alert(`${currentName} is already in the contacts`)
      return
    }

    console.log(currentName, "is being added")
    const newContact = {
      name: currentName,
      number: currentNumber,
    }
    setContacts(contacts.concat(newContact))
    setCurrentName("")
    setCurrentNumber("")
    event.target.reset()
  }

  const handleNameChange = (event) => {
    setCurrentName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setCurrentNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Contacts</h2>
      <p>
        Filter shown with <input onChange={handleFilterChange}></input>
      </p>
      <div>
        {contacts
          .filter((contact) => contact.name.toLowerCase().includes(filter))
          .map((contact) => (
            <Fragment key={contact.name}>
              {contact.name}: {contact.number}
              <br />
            </Fragment>
          ))}
      </div>
    </div>
  )
}

export default App
