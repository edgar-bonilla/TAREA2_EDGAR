'use strict';

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

let authors = [
  {
    id: 1,
    name: "Abraham Silberschatz",
    nationality: "Israeli/American",
    birth_year: 1952,
    fields: [
      "Database Systems",
      "Operating Systems"
    ]
  },
  {
    id: 2,
    name: "Andrew S. Tanenbaum",
    nationality: "Dutch/American",
    birth_year: 1944,
    fields: [
      "Distributed Computing",
      "Operating Systems"
    ]
  },
  {
    name: "Donald Knuth",
    nationality: "American",
    birth_year: 1938,
    fields: [
      "Algorithms",
      "Computer Programming"
    ]
  },
  {
    id: 3,
    name: "Donald Knuth editado",
    nationality: "American",
    birth_year: 1938,
    fields: [
      "Algorithms",
      "Computer Programming"
    ]
  }
];

const app = express.Router();

// Get all authors
app.get('/', (req, res) => {
  res.json(authors);
});


app.get('/:id', (req, res) => {
  const author = authors.find(a => a.id === req.params.id);
  if (!author) {
    return res.status(404).send('Author not found');
  }
  res.json(author);
});

// Add a new author
app.post('/', (req, res) => {
  const newAuthor = req.body;
  const exists = authors.some(a => a.name === newAuthor.name);

  if (exists) {
    return res.status(400).send('Author already exists');
  }


  newAuthor.id = authors.length + 1;

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// Update an existing author
app.put('/:id', (req, res) => {
  const authorIndex = authors.findIndex(a => a.id === req.params.id);

  if (authorIndex === -1) {
    return res.status(404).send('Author not found');
  }

  authors[authorIndex] = { ...authors[authorIndex], ...req.body };
  res.json(authors[authorIndex]);
});


app.delete('/:id', (req, res) => {
  const authorIndex = authors.findIndex(a => a.id === req.params.id);

  if (authorIndex === -1) {
    return res.status(404).send('Author not found');
  }

  authors.splice(authorIndex, 1);
  res.status(204).send(); 
});

const exp = express();
exp.use(bodyParser.json());
exp.use('/.netlify/functions/authors', app);

module.exports = exp;
module.exports.handler = serverless(exp);
