import contactService from "../services/contacts"
import { useState } from "react"
import { useRef } from "react"

const AddContact = ({
  contacts,
  setContacts,
  setNotification,
  setNotificationType,
}) => {
  // const [currentName, setCurrentName] = useState("")
  // const [currentNumber, setCurrentNumber] = useState("")
  const currentName = useRef("")
  const currentNumber = useRef("")
  const setCurrentName = (newName) => (currentName.current = newName)
  const setCurrentNumber = (newNumber) => (currentNumber.current = newNumber)

  const handleNameChange = (event) => {
    setCurrentName(event.target.value)
    console.log("name is changed", event.target.value, currentName)
  }

  const handleNumberChange = (event) => {
    setCurrentNumber(event.target.value)
    console.log("current number is now", currentNumber)
  }

  const addName = (event) => {
    event.preventDefault()
    const newContact = {
      name: currentName.current,
      number: currentNumber.current,
    }
    console.log(newContact)

    var inList = false
    // TODO: bad check since there might be a contact like that added in another browser and then ther will be two contacts with the same name.
    if (contacts.map((contact) => contact.name).includes(newContact.name)) {
      inList = true
      if (
        !window.confirm(
          `${newContact.name} is already in the contact list. Replace the old number with a new one?`
        )
      ) {
        return
      }
    }
    console.log(currentNumber)

    // ensure that the version in the browser corresponds to the version on server
    if (inList) {
      console.log(
        `the number for ${newContact.name} is being replaced (to ${newContact.number})`
      )
      contactService
        .changeContact(
          contacts.filter((c) => c.name === newContact.name)[0].id, // find the id of the contact with that name
          newContact
        )
        .then((added) => {
          console.log(
            contacts.map((c) => (c.name === newContact.name ? added : c))
          )
          setContacts(
            contacts.map((c) => (c.name === newContact.name ? added : c))
          )
          setNotification(
            `The number of ${newContact.name} is set to ${newContact.number}`
          )
        })
        .catch((error) => {
          console.log(error)
          setNotification(
            `Error! Looks like the information about ${newContact.name} has already been deleted from the server.`
          )
          setNotificationType("error")
          // TODO: delete the old information then?
          setContacts(contacts.filter((c) => c.name != newContact.name)) // name is assumed to be unique
        })
    } else {
      console.log(newContact.name, "is being added")
      contactService
        .addContact(newContact)
        .then((added) => setContacts(contacts.concat(added)))
      setNotification(`${newContact.name} is added.`)
    }
    console.log("got here")

    setTimeout(() => {
      setNotification(null)
      setNotificationType("success") // the default type is set to success; bad code since strings are hardcoded
    }, 5000)
    event.target.reset()
    // rerenders automatically as contacts are set
  }

  return (
    <form
      onSubmit={addName}
      onReset={() => {
        setCurrentName("")
        setCurrentNumber("")
      }}
    >
      <div>
        name: <input onInput={handleNameChange} />
      </div>
      <div>
        number: <input onInput={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default AddContact
