import axios from "axios"

const SERVER_URL = "http://localhost:3001/persons"

// todo: fix duplicated "then(...)"
const getAll = () => axios.get(SERVER_URL).then((response) => response.data)

const addContact = (newContact) =>
  axios.post(SERVER_URL, newContact).then((response) => response.data)

export default { getAll, addContact }
