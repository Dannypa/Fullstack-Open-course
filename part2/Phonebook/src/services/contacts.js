import axios from "axios"

const SERVER_URL = "http://localhost:3001/persons"

const getAll = () => axios.get(SERVER_URL).then((response) => response.data)

export default { getAll }
