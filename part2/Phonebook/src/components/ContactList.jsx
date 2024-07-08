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
  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id != id))
    contactService.deleteContact(id)
  }

  return (
    <div>
      {contacts
        .filter((contact) => contact.name.toLowerCase().includes(filter))
        .map((contact) => (
          <Contact
            key={contact.name}
            contact={contact}
            deleteContact={() => deleteContact(contact.id)}
          />
        ))}
    </div>
  )
}

export default ContactList
