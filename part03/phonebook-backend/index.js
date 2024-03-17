require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require("cors");
const Person = require('./models/person');

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());


// using the morgan middleware for logging
morgan.token("getBody", function (req, res) {
  // console.log('response', res);
  if (req.method === "POST") return JSON.stringify(req.body);
  return null;
})

app.use(morgan(":method :url :status :response-time ms :getBody"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
  })
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  console.log(person)
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 10000);
}

app.post("/api/persons", (request, response) => {

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
