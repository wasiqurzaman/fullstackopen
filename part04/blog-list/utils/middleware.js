const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

morgan.token("getPostBody", function (req, res) {
  if (req.method === "POST" || req.method === "PUT") return JSON.stringify(req.body);
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
  next()
}

const errorHanlder = (error, request, response, next) => {
  console.log(error);
  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  next(error);
}

// exercise 4.20
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
}

// exercise 4.22
const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  } else {
    request.user = await User.findById(decodedToken.id)
  }
  next();
}

module.exports = {
  unknownEndpoint, morgan, errorHanlder, tokenExtractor, userExtractor
}