const logger = require("./logger");
const morgan = require("morgan");

// middleware for logging
const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("----------------------");
  next();
};

// using the morgan middleware for logging
morgan.token("getBody", function (req, /*res*/) {
  if (req.method === "POST") return JSON.stringify(req.body);
  return null;
});

// unknown endpoint handler middleware
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
  next();
};

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  logger.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json(error);
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  morgan
}