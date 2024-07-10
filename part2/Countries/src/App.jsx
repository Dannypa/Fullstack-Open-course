import { useState, useRef } from "react"
import countryService from "./services/countries"

const Country = ({ country }) => {
  return <p>{country.name.official}</p>
}

const CountryList = ({ list, loaded }) => {
  if (!loaded.current) {
    return <div>Loading...</div>
  } else if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    return (
      <div>
        {list.map((c) => (
          <Country key={c.name.official} country={c} />
        ))}
      </div>
    )
  }
}

const App = () => {
  const [currentCountry, setCurrentCountry] = useState("")
  const [countryList, setCountryList] = useState([])
  const loaded = useRef(true)

  const handleCountryChange = (event) => {
    loaded.current = false
    setCurrentCountry(event.target.value)
    countryService.getByName(currentCountry).then((list) => {
      setCountryList(list)
      loaded.current = true
    })
  }

  return (
    <div>
      enter country name: <input onChange={handleCountryChange} /> <br />
      <CountryList list={countryList} loaded={loaded} />
    </div>
  )
}

export default App
