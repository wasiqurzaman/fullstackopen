import { useEffect, useState, useRef } from "react";

import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  // const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    // console.log("effect");
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  }, []);
  // console.log("render", notes.length, "notes");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = noteObject => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then(returnedNote => {
      // console.log(returnedNote);
      setNotes(notes.concat(returnedNote));
    });
  };

  // const handleNoteChange = event => {
  //   setNewNote(event.target.value);
  // };

  const toggleImportanceOf = id => {
    // console.log("importance of ", id, " needs to be toggled");
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content} was already removed from server'`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const deleteNote = id => {
    const note = notes.find(note => note.id === id);
    noteService
      .deleteNote(id)
      .then(retuenedNote => {
        console.log(retuenedNote);
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content} is already removed from server'`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const handleLogin = async (username, password) => {
    // console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async event => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedNoteAppUser");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    );
  };

  // useRef
  const noteFormRef = useRef();
  // console.log(noteFormRef);

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  const logoutButton = () => {
    return <button onClick={handleLogout}>logout</button>;
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      {user === null || logoutButton()}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            handleDelete={() => deleteNote(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
