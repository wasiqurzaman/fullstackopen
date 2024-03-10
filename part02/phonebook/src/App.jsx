import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import ShowPersons from "./components/ShowPersons";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (
      persons.findIndex(
        (p) => p.name.toLowerCase() === newName.toLowerCase()
      ) !== -1
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (
      persons.findIndex(
        (p) => p.number.toLowerCase() === newNumber.toLowerCase()
      ) !== -1
    ) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // implement filter (need improvement)
  let [filteredPersons, setFilteredPersons] = useState([]);
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    var regex = new RegExp(`${searchQuery}`, "i");
    const foundPersons = persons.filter((person) => {
      if (regex.test(person.name)) return true;
    });
    setFilteredPersons(foundPersons);
    console.log("filtered persons", filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Number</h2>
      <ShowPersons
        filteredPersons={filteredPersons}
        persons={persons}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default App;
