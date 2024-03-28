const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { initialBlogPosts } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjecs = initialBlogPosts.map(blog => new Blog(blog));
  const promiseArray = blogObjecs.map(blog => blog.save());

  await Promise.all(promiseArray);
});

//4.8
test("blog list api return correct amount of blog post in json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are only two blog posts", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogPosts.length);
});

//4.9
test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map(b => Object.keys(b)).flat();
  // console.log(contents);
  assert(contents.includes("id"));
});

//4.10
test("a new blog post can be added by making an HTTP POST request", async () => {
  const newBlogPost = {
    title: "This post added to test HTTP POST",
    author: "Wasiqur Zaman",
    url: "/api/blogs/64564656497",
    likes: 1264
  }

  await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await Blog.find({});
  // console.log(response);
  const blogPostsAtEnd = response.map(r => r.toJSON());
  // console.log(blogPostAtEnd);
  assert.strictEqual(blogPostsAtEnd.length, initialBlogPosts.length + 1);

  const titles = blogPostsAtEnd.map(b => b.title);
  assert(titles.includes("This post added to test HTTP POST"));
});

//4.11
test("if the likes property is missing from the request, 0 will be default value", async () => {
  const newBlogPost = {
    title: "The default value for like is 0 if its missing",
    author: "Wasiqur Zaman",
    url: "/api/blogs/031987",
  }

  await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await Blog.find({});
  const blogPostsAtEnd = response.map(b => b.toJSON());
  assert.strictEqual(blogPostsAtEnd[blogPostsAtEnd.length - 1].likes, 0);
});

//4.12
test("if title or url missing from the req data 400 will be returned", async () => {
  const newBlogPost = {
    title: "This post added to test HTTP POST",
    author: "Wasiqur Zaman",
    // url: "/api/blogs/64564656497",
    likes: 1264
  }

  await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  // const response = await Blog.find({});
  // // console.log(response);
  // const blogPostsAtEnd = response.map(r => r.toJSON());
  // // console.log(blogPostAtEnd);
  // assert.strictEqual(blogPostsAtEnd.length, initialBlogPosts.length + 1);

  // const titles = blogPostsAtEnd.map(b => b.title);
  // assert(titles.includes("This post added to test HTTP POST"));
});

//4.13 
test("deletion of a single blog succeeds with status code 204 if id is valid", async () => {
  const blogs = await Blog.find({});
  const blogPostsAtStart = blogs.map(blog => blog.toJSON());
  const blogToDelete = blogPostsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsUpdated = await Blog.find({});
  const blogPostsAtEnd = blogsUpdated.map(blog => blog.toJSON());

  const contents = blogPostsAtEnd.map(b => b.title);
  assert(!contents.includes(blogToDelete.title));

  assert.strictEqual(blogPostsAtEnd.length, initialBlogPosts.length - 1);
})


//4.14 
test("updating a single post succeeds if there is valid id and data", async () => {
  const blogs = await Blog.find({});
  const blogPostsAtStart = blogs.map(blog => blog.toJSON());
  console.log(blogPostsAtStart);
  const blogToUpdate = blogPostsAtStart[0];

  const newBlogPost = {
    "title": "Hey there. How are you?",
    "author": "Rasiduz Zaman",
    "url": "api/blogs/121",
    "likes": 32
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsUpdated = await Blog.find({});
  const blogPostsAtEnd = blogsUpdated.map(blog => blog.toJSON());
  console.log(blogPostsAtEnd);

  const contents = blogPostsAtEnd.map(b => b.title);
  assert(contents.includes(newBlogPost.title));

  assert.strictEqual(blogPostsAtEnd.length, initialBlogPosts.length);
})


after(async () => {
  await mongoose.connection.close();
});

