import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'


const Countries = ({ countries, showInfo }) => {
  return (
    <div>
      {
        countries.length >= 10 ?
          <p>too many matches, specify another filter</p> : (
            <ul>
              {
                countries.map(c => (
                  <div key={c.alpha3Code}>
                    {c.name}{" "}
                    <button onClick={() => showInfo(c.name)}>Show</button>
                  </div>
                ))}

            </ul>
          )

      }
    </div>
  )
}

const Country = ({ country }) => {

  const [weather, setWeather] = useState()
  const capital = country.capital;

  useEffect(() => {

    const weatherAPI = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`

    axios
      .get(weatherAPI)
      .then(res => {
        console.log(res)
        setWeather(res.data)
      })
  }, [capital])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>

      <h2>Languages</h2>
      {country.languages.map((language) => (
        <li key={language.name}>{language.name}</li>
      ))}

      <img
        style={{ margin: "20px 0" }}
        width="100px"
        src={country.flag}
        alt={`${country.name} flag`}
      />

      <CapitalWeather weather={weather} />
    </div>
  )
}

const CapitalWeather = ({ weather }) => {
  return (
    <div>
      {
        weather ?
          <>
            <h2>Weather in {weather.location.name}</h2>
            <div>Temperature: {weather.current.temperature} Celcius</div>
            <img src={weather.current.weather_icons[0]} alt="" />
            <div>
              Wind: {weather.current.wind_speed} mph, Direction:{" "}
              {weather.current.wind_dir}
            </div>
          </> :
          <div>null</div>
      }
    </div>
  )
}



function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log(res);
        setCountries(res.data)
      })

    const weatherAPI = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country}`

    axios
      .get(weatherAPI)
      .then(res => {
        console.log(res)
      })
  }, [])

  const handleChangeCountry = (event) => {
    setCountry(event.target.value)
    console.log(country);
  }


  const handleSubmit = (event) => {
    event.preventDefault()

  }


  const showInfo = (country) => {
    setCountry(country);
  };

  const countriesDisplayed =
    country && countries.filter((c) => c.name.toLowerCase().includes(country.toLowerCase()))

  return (
    <div>
      <h1>country</h1>
      <form onSubmit={handleSubmit}>
        <input value={country} onChange={handleChangeCountry} />

      </form>
      <div>
        {countriesDisplayed.length === 1 ?
          <Country country={countriesDisplayed[0]} /> :
          <Countries showInfo={showInfo} countries={countriesDisplayed ? countriesDisplayed : []} />
        }
      </div>
    </div>
  );
}

export default App;
