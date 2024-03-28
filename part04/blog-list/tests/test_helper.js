const Blog = require("../models/blog");

const initialBlogPosts = [
  { title: "Hello World", author: "Wasiqur Zaman", url: "/api/blogs/1", likes: 12 },
  { title: "Hello World 2", author: "Rashiduz Zaman", url: "/api/blogs/2", likes: 10 }
]


module.exports = {
  initialBlogPosts
}