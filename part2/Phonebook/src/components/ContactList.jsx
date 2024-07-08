const Contact = (contact) => (
  <>
    {contact.name}: {contact.number}
    <br />
  </>
)

const ContactList = ({ contacts, filter }) => (
  <div>
    {contacts
      .filter((contact) => contact.name.toLowerCase().includes(filter))
      .map((contact) => (
        <Contact key={contact.name} {...contact} />
      ))}
  </div>
)

export default ContactList
