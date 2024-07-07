const AddContact = (props) => {
  var currentName = "" // why do we need states for this?
  const setCurrentName = (newName) => (currentName = newName)
  var currentNumber = ""
  const setCurrentNumber = (newNumber) => (currentNumber = newNumber)

  const handleNameChange = (event) => {
    setCurrentName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setCurrentNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (props.contacts.map((contact) => contact.name).includes(currentName)) {
      alert(`${currentName} is already in the contacts`)
      return
    }

    console.log(currentName, "is being added")
    const newContact = {
      name: currentName,
      number: currentNumber,
    }
    props.setContacts(props.contacts.concat(newContact))
    setCurrentName("")
    setCurrentNumber("")
    event.target.reset()
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNameChange} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default AddContact
