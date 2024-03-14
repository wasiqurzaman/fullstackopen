import ShowCountryDetails from "./ShowCountryDetails";

const ShowCountries = ({
  countries,
  foundCountries,
  searchText,
  handleShowDetails,
  weather,
}) => {
  if (searchText === "" || searchText === null) {
    return <div>Search Country For Details</div>;
  }
  if (foundCountries.length === 1) {
    return (
      <div>
        {foundCountries.map((country, i) => (
          <ShowCountryDetails
            key={i}
            country={country}
            searchText={searchText}
            weather={weather}
          />
        ))}
      </div>
    );
  }

  if (foundCountries.length > 1) {
    return (
      <div>
        <p>{foundCountries.length} Countries found:</p>
        {foundCountries.map((country, i) => (
          <p key={i}>
            {i + 1}. {country.name.common}
            <button onClick={() => handleShowDetails(country.name.common)}>
              Show Details
            </button>
          </p>
        ))}
      </div>
    );
  }
  if (foundCountries.length === 0) {
    return <div>No Countries Found</div>;
  }
  // return (
  //   <div>
  //     {countries.map((country, i) => (
  //       <ShowCountryDetails key={i} country={country} searchText={searchText} />
  //     ))}
  //   </div>
  // );
};

export default ShowCountries;
