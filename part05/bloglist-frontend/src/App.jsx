import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

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
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [sortedBlogs, setSortedBlogs] = useState([]);

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

  const createNewBlog = async newBlog => {
    blogService.setToken(user.token);
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setMessage(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlog = (id, updatedBlog) => {
    blogService
      .update(id, updatedBlog)
      .then(returnBlog => {
        setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnBlog)));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteBlog = async id => {
    blogService.setToken(user.token);
    console.log(user.token);
    try {
      const blogToDelete = blogs.find(blog => blog.id === id);
      const deletedBlog = await blogService.deleteBlog(id);
      console.log(deletedBlog);
      setBlogs(blogs.filter(blog => blog.id !== id));
      setMessage(
        `The blog ${blogToDelete.title} by ${blogToDelete.author} deleted.`
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

  const blogFormRef = useRef();
  // console.log(blogFormRef);

  const handleSorting = () => {
    if (sortedBlogs.length === 0) {
      const sorted = blogs.sort((a, b) => b.likes - a.likes);
      console.log(sorted);
      setSortedBlogs(sorted);
      setIsSorted(!isSorted);
    } else {
      setIsSorted(!isSorted);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
            message={message}
            msgType={msgType}
          />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} msgType={msgType} />
      <span>{user.name} logged in </span>
      <button onClick={handleLogout}>logout</button>
      <br />
      <br />
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <br />
      <br />
      <div>
        <button onClick={handleSorting}>
          {isSorted ? "Sort by order" : "Sort by likes"}
        </button>

        {isSorted
          ? sortedBlogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))
          : blogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
      </div>
    </div>
  );
};

export default App;
