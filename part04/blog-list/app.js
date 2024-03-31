const config = require("./utils/config");
const express = require('express')
require("express-async-errors");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");


mongoose.set("strictQuery", false);
console.log("connecting to ", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to ', config.MONGODB_URI);
})

app.use(cors())
app.use(express.json());
app.use(middleware.morgan(":method :url :status :response-time ms :getPostBody"));

//jwt token extranctor //use the middleware in all routes // exercise 4.20
app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);

// use the middleware only in /api/blogs routes  // exercise 4.22
// app.use("/api/blogs", middleware.userExtractor, blogsRouter);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHanlder);

module.exports = app;