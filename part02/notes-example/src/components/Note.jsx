const Note = ({ note, toggleImportance, handleDelete }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={handleDelete} className="btn-delete">
        delete
      </button>
    </li>
  );
};

export default Note;
