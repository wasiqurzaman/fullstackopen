const morgan = require("morgan");

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
  }
  next(error);
}

module.exports = {
  unknownEndpoint, morgan, errorHanlder
}