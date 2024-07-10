import { useState, useRef } from "react"
import countryService from "./services/countries"

const CountryShort = ({ country }) => {
  return <p>{country.name.official}</p>
}

// const CountryFull = ({country}) => {

// }

const CountryList = ({ list, isLoaded, isFiltered }) => {
  if (!isFiltered) {
    return <div>Start typing the name of the country</div>
  } else if (!isLoaded.current) {
    return <div>Loading...</div>
  } else if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (list.length === 1) {
  } else {
    return (
      <div>
        {list.map((c) => (
          <CountryShort key={c.name.official} country={c} />
        ))}
      </div>
    )
  }
}

const App = () => {
  const [currentCountry, setCurrentCountry] = useState("")
  const [countryList, setCountryList] = useState([])
  const isLoaded = useRef(true)

  const handleCountryChange = (event) => {
    isLoaded.current = false
    console.log("changed", currentCountry)
    setCurrentCountry(event.target.value)
    countryService.getByName(event.target.value).then((list) => {
      setCountryList(list)
      isLoaded.current = true
    })
  }

  return (
    <div>
      enter country name: <input onChange={handleCountryChange} /> <br />
      <CountryList
        list={countryList}
        isLoaded={isLoaded}
        isFiltered={currentCountry !== ""}
      />
    </div>
  )
}

export default App
