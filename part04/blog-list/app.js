const config = require("./utils/config");
const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const middleware = require("./utils/middleware");


mongoose.set("strictQuery", false);
console.log("connecting to ", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to ', config.MONGODB_URI);
})

app.use(cors())
app.use(express.json());
app.use(middleware.morgan(":method :url :status :response-time ms :getPostBody"));

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;