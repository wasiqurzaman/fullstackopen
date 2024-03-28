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
test.only("blog list api return correct amount of blog post in json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("there are only two blog posts", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogPosts.length);
});

//4.9
test.only("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map(b => Object.keys(b)).flat();
  // console.log(contents);
  assert(contents.includes("id"));
});

//4.10
test.only("a new blog post can be added by making an HTTP POST request", async () => {
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
test.only("if the likes property is missing from the request, 0 will be default value", async () => {
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
test.only("if title or url missing from the req data 400 will be returned", async () => {
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


after(async () => {
  await mongoose.connection.close();
});

