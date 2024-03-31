const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

//token authentication
// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// }

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  // // console.log(request.token)
  // const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token invalid" });
  // }
  // // console.log(decodedToken);

  // const user = await User.findById(decodedToken.id);
  // console.log(user)
  console.log(request.user)
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author || user.name,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
})

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  // const body = request.body;
  // const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token invalid" });
  // }

  // const user = await User.findById(decodedToken.id);

  const user = request.user;
  console.log(user)

  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete || !user) {
    return response.status(404).json({ error: "no blog to delete or not a user" })
  }

  if (user.id.toString() === blogToDelete.user.toString()) {
    const deletedBlog = await Blog.findByIdAndDelete(blogToDelete.id);
    // console.log("deleted blog", deletedBlog._id.toString());
    // console.log("user blogs", user.blogs[0].toString())
    user.blogs = user.blogs.filter(b => b.toString() !== deletedBlog._id.toString());
    await user.save();
    response.status(204).end();
  } else {
    response.status(401).json({ error: "unauthorized user" })
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = { title, author, url, likes }

  const updatedBlogPost = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: "query" });
  response.json(updatedBlogPost);
});


module.exports = blogsRouter;