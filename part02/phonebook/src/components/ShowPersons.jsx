import Person from "./Person";

const ShowPersons = ({ filteredPersons, persons, searchQuery }) => {
  if (!searchQuery) {
    return (
      <div>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </div>
    );
  }
  if (filteredPersons.length > 0) {
    return (
      <div>
        {filteredPersons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </div>
    );
  } else {
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>;
  }
};

export default ShowPersons;
