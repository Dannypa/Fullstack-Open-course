import axios from "axios"

const SERVER_URL = "http://localhost:3001/persons"

const contactUrl = (id) => `${SERVER_URL}/${id}`

// todo: fix duplicated "then(...)"
const getAll = () => axios.get(SERVER_URL).then((response) => response.data)

const addContact = (newContact) =>
  axios.post(SERVER_URL, newContact).then((response) => response.data)

const deleteContact = (id) =>
  axios.delete(contactUrl(id)).then((response) => response.data)

const changeContact = (id, newContact) =>
  axios.put(contactUrl(id), newContact).then((response) => response.data)

export default { getAll, addContact, deleteContact, changeContact }
