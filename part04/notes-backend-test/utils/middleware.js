const logger = require("./logger");

// middleware for logging
const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("----------------------");
  next();
};

// unknown endpoint handler middleware
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unkown endpoint" });
  next();
};

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  logger.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}