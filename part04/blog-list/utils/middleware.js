const morgan = require("morgan");

morgan.token("getPostBody", function (req, res) {
  if (req.method === "POST") return JSON.stringify(req.body);
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
  next()
}

module.exports = {
  unknownEndpoint, morgan
}