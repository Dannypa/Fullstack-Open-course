import { useState } from "react"
import { Fragment } from "react"

const App = () => {
  const [contacts, setContacts] = useState([])
  var currentName = "" // why do we need states for this?
  const setCurrentName = (newName) => (currentName = newName)
  var currentNumber = ""
  const setCurrentNumber = (newNumber) => (currentNumber = newNumber)

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
      <div>
        {contacts.map((contact) => (
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
