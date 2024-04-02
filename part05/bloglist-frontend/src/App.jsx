import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  message,
  msgType,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} msgType={msgType} />
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const Notification = ({ message, msgType }) => {
  if (!message) {
    return null;
  }
  return (
    <div className={msgType === "error" ? "message error" : "message"}>
      {message}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  const createNewBlog = async event => {
    event.preventDefault();
    console.log("new blog");
    const newBlog = {
      title,
      author,
      url,
      likes: 0,
    };
    blogService.setToken(user.token);
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`${user.name} successfully logged in`);
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMsgType("error");
      setMessage("Wrong username or password");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setMessage(`${user.name} logged out`);
    setTimeout(() => setMessage(null), 3000);
    setUser(null);
  };

  if (!user) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
        message={message}
        msgType={msgType}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} msgType={msgType} />
      <span>{user.name} logged in </span>
      <button onClick={handleLogout}>logout</button>
      <br />
      <h2>Create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      <br />
      <br />
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
