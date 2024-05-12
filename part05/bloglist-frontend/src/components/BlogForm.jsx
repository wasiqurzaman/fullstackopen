import { useState } from "react";
import blogs from "../services/blogs";

function BlogForm({ createNewBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    console.log("new blog");
    const newBlog = {
      title,
      author,
      url,
      likes: 0,
    };
    createNewBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}

export default BlogForm;
