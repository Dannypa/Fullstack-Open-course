import axios from "axios"

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAll = () => {
  return axios.get(`${BASE_URL}/all`).then((resp) => resp.data)
}

const getByName = (filter) => {
  return getAll().then((list) =>
    list.filter((c) =>
      c.name.official.toLowerCase().includes(filter.toLowerCase())
    )
  )
}

export default { getAll, getByName }
