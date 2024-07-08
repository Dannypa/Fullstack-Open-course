import contactService from "../services/contacts"

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
    console.log("current number is now", currentNumber)
  }

  const addName = (event) => {
    event.preventDefault()

    var inList = false
    if (props.contacts.map((contact) => contact.name).includes(currentName)) {
      inList = true
      if (
        !window.confirm(
          `${currentName} is already in the contact list. Replace the old number with a new one?`
        )
      ) {
        return
      }
    }
    console.log(currentNumber)
    const newContact = {
      name: currentName,
      number: currentNumber,
    }

    // ensure that the version in the browser corresponds to the version on server
    if (inList) {
      console.log(
        `the number for ${newContact.name} is being replaced (to ${newContact.number})`
      )
      contactService
        .changeContact(
          props.contacts.filter((c) => c.name === newContact.name)[0].id, // find the id of the contact with that name
          newContact
        )
        .then((added) => {
          console.log(
            props.contacts.map((c) => (c.name === newContact.name ? added : c))
          )
          props.setContacts(
            props.contacts.map((c) => (c.name === newContact.name ? added : c))
          )
        })
    } else {
      console.log(currentName, "is being added")
      contactService
        .addContact(newContact)
        .then((added) => props.setContacts(props.contacts.concat(added)))
    }

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
