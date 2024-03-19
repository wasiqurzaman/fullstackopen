const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const personsRouter = require("./controllers/persons");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const Person = require("./models/person");


mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info("connected to MongoDB");
}).catch(error => {
  logger.error("error connecting to MongoDB", error.message);
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.morgan(":method :url :status :response-time ms :getBody"));

app.get("/info", (request, response) => {
  Person.find({})
    .then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
    });
});

app.use("/api/persons", personsRouter);

app.use(middleware.unknownEndpoint);
// this has to be the last loaded middleware, also all the routes should be registered before this.
app.use(middleware.errorHandler);

module.exports = app;