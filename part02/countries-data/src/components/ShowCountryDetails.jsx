const ShowCountryDetails = ({ country, weather }) => {
  let languages = [];
  let currencies = [];
  if (country.languages && Object.keys(country.languages).length > 0) {
    languages = Object.keys(country.languages).map(
      (key) => country.languages[key]
    );
  }

  if (country.currencies && Object.keys(country.currencies).length > 0) {
    currencies = Object.keys(country.currencies).map(
      (key) => country.currencies[key]
    );
  }

  // console.log(currencies);

  return (
    <div className="country-container">
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>
      <h3>Currencies:</h3>
      <ul>
        {currencies.map((c, i) => (
          <li key={i}>{c.name}</li>
        ))}
      </ul>
      <div>
        <h3>Flag</h3>
        <img src={country.flags.svg} alt="country flag" width="200px" />
      </div>
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>
          Temperature: {weather ? (weather.main.temp - 273).toFixed(2) : ""}{" "}
          Celcius
        </p>
        <img
          src={
            weather
              ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
              : ""
          }
          alt="weather icon"
        />
        <p>Wind: {weather ? weather.wind.speed : ""} m/s</p>
      </div>
    </div>
  );
};

export default ShowCountryDetails;
