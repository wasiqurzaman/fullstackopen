import Person from "./Person";

const ShowPersons = ({
  filteredPersons,
  persons,
  searchQuery,
  handleDelete,
}) => {
  if (!searchQuery) {
    return (
      <div>
        {persons.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={() => handleDelete(person.id)}
          />
        ))}
      </div>
    );
  }
  if (filteredPersons.length > 0) {
    return (
      <div>
        {filteredPersons.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={() => handleDelete(person.id)}
          />
        ))}
      </div>
    );
  } else {
    <div>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </div>;
  }
};

export default ShowPersons;
