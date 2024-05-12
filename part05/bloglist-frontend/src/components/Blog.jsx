import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [isHidden, setIsHidden] = useState(true);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "2px solid gray",
    marginBottom: 5,
  };

  const handleLike = id => {
    // const blog = blogs.find(blog => blog.id === id);
    console.log(id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(id, updatedBlog);
  };

  const handleDelete = id => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`))
      deleteBlog(id);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button
        onClick={() => setIsHidden(!isHidden)}
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      >
        {isHidden ? "view" : "hide"}
      </button>
      {blog.user.username === user.username && (
        <button onClick={() => handleDelete(blog.id)}>delete</button>
      )}
      {isHidden || (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.author}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
