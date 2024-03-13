import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import ShowPersons from "./components/ShowPersons";
import axios from "axios";
import personService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    if (
      persons.findIndex(
        (p) => p.number.toLowerCase() === newNumber.toLowerCase()
      ) !== -1
    ) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }

    if (
      persons.findIndex(
        (p) => p.name.toLowerCase() === newName.toLowerCase()
      ) !== -1
    ) {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmation) {
        const personToUpdate = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        );
        const newPersonObj = {
          ...personToUpdate,
          number: newNumber,
        };
        personService
          .update(personToUpdate.id, newPersonObj)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }

      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      // console.log(res.data);
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    const confirmation = window.confirm(`Delete ${personToDelete.name} ?`);
    if (confirmation) {
      personService.deletePerson(id).then((returnedPerson) => {
        console.log(returnedPerson);
        setPersons(
          persons.filter((person) => (person.id !== id ? true : false))
        );
      });
    }
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
        handleDelete={deletePerson}
      />
    </div>
  );
}

export default App;
