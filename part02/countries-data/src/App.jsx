import axios from "axios";
import { useEffect, useState } from "react";

import ShowCountries from "./components/ShowCountries";

const App = () => {
  const [countrySearchText, setCountrySearchText] = useState("");
  const [countries, setCountries] = useState([]);

  // https://studies.cs.helsinki.fi/restcountries/api/all
  // https://studies.cs.helsinki.fi/restcountries/api/name/finland
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        // console.log(res.data);
        setCountries(res.data);
      });
  }, []);

  // search implementation
  const [foundCountries, setFoundCountries] = useState([]);
  const handlecountrySearchTextChange = (event) => {
    setCountrySearchText(event.target.value);
    const regex = new RegExp(`${event.target.value}`, "i");
    const foundCountries = countries.filter((country) => {
      if (regex.test(country.name.common)) return true;
    });
    setFoundCountries(foundCountries);
    // getting weather data
    if (foundCountries.length === 1) {
      const country = foundCountries[0];
      // console.log(country);
      // setFoundCountries([country]);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
        )
        .then((res) => {
          console.log(res.data);
          setWeather(res.data);
        });
    }
  };
  // console.log(foundCountries);

  const api_key = import.meta.env.VITE_OWM_KEY;
  const [weather, setWeather] = useState(null);

  const showCountryDetails = (name) => {
    const country = foundCountries.find((c) => c.name.common === name);
    console.log(country);
    setFoundCountries([country]);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
      )
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
      });
  };

  // console.log(countrySearchText);

  return (
    <div>
      <div className="form-container">
        find countries
        <input
          value={countrySearchText}
          onChange={handlecountrySearchTextChange}
          placeholder="Enter a country name..."
        />
      </div>
      <ShowCountries
        countries={countries}
        foundCountries={foundCountries}
        searchText={countrySearchText}
        handleShowDetails={showCountryDetails}
        weather={weather}
      />
    </div>
  );
};

export default App;
