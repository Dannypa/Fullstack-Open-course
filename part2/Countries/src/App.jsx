import { useState, useRef } from "react"
import countryService from "./services/countries"
import weatherService from "./services/weather"
import { useEffect } from "react"

const CountryShort = ({ country, setIsFull }) => {
  return (
    <p>
      {country.name.official}{" "}
      <button onClick={() => setIsFull(true)}>show</button>
    </p>
  )
}

const CountryFull = ({ country, isHideable, setIsFull }) => {
  const languageList = Object.values(country.languages).map((l) => (
    <li key={l}>{l}</li>
  ))
  const hideButton = isHideable ? (
    <p>
      <button onClick={() => setIsFull(false)}>hide</button>
    </p>
  ) : null

  const [weather, setWeather] = useState(null)
  useEffect(() => {
    weatherService.getWeather(country.capitalInfo.latlng).then((w) => {
      setWeather(
        <div>
          <p>The temperature is {w.current.temp_c} celcius.</p>
          <img src={`https://${w.current.condition.icon.slice(2)}`} />{" "}
          {/* slice cuz the returned url is prefixed by // */}
          <p>
            The wind is {Math.round((w.current.wind_kph / 3.6) * 100) / 100}{" "}
            m/s.{" "}
          </p>
        </div>
      )
    })
  }, [])
  return (
    <div>
      <h2>{country.name.official}</h2>
      {hideButton}
      <div>
        Capital {country.capital[0]}, area {country.area}.{" "}
      </div>
      <h5>Languages:</h5>
      <ul>{languageList}</ul>
      <img src={country.flags.png} style={{ border: "solid" }} />

      <h3>Weather at {country.capital[0]}:</h3>
      {weather}
    </div>
  )
}

const CountryComponent = ({ isHideable, country }) => {
  if (!isHideable) {
    return <CountryFull {...{ country, isHideable }} />
  } else {
    const [isFull, setIsFull] = useState(false)
    const args = { country, isHideable, setIsFull }
    if (!isFull) {
      return <CountryShort {...args} />
    } else {
      return <CountryFull {...args} />
    }
  }
}

const CountryList = ({ list, isLoaded, isFiltered }) => {
  const [isOpened, setIsOpened] = useState(
    Array(Math.min(list.length, 10)).fill(false)
  )
  if (!isFiltered) {
    return <div>Start typing the name of the country</div>
  } else if (!isLoaded.current) {
    return <div>Loading...</div>
  } else if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (list.length === 1) {
    return (
      <CountryComponent isFull={true} country={list[0]} isHideable={false} />
    )
  } else {
    return (
      <div>
        {list.map((c) => (
          <CountryComponent
            key={c.name.official}
            country={c}
            isHideable={true}
          />
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
