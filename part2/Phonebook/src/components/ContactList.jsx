import { Fragment } from "react"

const ContactList = ({ contacts, filter }) => (
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
)

export default ContactList
