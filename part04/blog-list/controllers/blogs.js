const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    })
});

blogsRouter.get("/:id", (request, response) => {
  Blog.findById(request.params.id).then(foundBlog => {
    response.json(foundBlog);
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndDelete(request.params.id).then(deletedBlog => {
    response.status(204).end();
  })
})

module.exports = blogsRouter;