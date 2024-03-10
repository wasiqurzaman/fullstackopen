const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input type="text" value={newName} onChange={handleNameChange} />
      </div>
      <br />
      <div>
        number:{" "}
        <input type="text" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit"> add</button>
      </div>
    </form>
  );
};

export default PersonForm;
