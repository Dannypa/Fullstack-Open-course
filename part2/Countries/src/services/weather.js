import axios from "axios"

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY
const getUrl = (lat, lng) =>
  `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lng}&aqi=no`

const getWeather = (coords) => {
  return axios.get(getUrl(coords[0], coords[1])).then((resp) => resp.data)
}

export default { getWeather }
