import contactService from "../services/contacts"

const Contact = ({ contact, deleteContact }) => {
  return (
    <>
      {contact.name}: {contact.number}{" "}
      <button onClick={deleteContact}>delete</button>
      <br />
    </>
  )
}

const ContactList = ({ contacts, setContacts, filter }) => {
  const deleteContact = (contact) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${contact.name} from your phone book?`
      )
    ) {
      setContacts(contacts.filter((c) => c.id !== contact.id))
      contactService.deleteContact(contact.id)
    }
  }

  return (
    <div>
      {contacts
        .filter((contact) => contact.name.toLowerCase().includes(filter))
        .map((contact) => (
          <Contact
            key={contact.name}
            contact={contact}
            deleteContact={() => deleteContact(contact)}
          />
        ))}
    </div>
  )
}

export default ContactList
