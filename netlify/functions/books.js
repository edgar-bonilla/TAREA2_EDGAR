'use strict';

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

let books = [
  {
    id: "1",
    title: "Operating System Concepts",
    edition: "9th",
    copyright: 2012,
    language: "ENGLISH",
    pages: 976,
    author: "Abraham Silberschatz",
    author_id: 1,
    publisher: "John Wiley & Sons",
    publisher_id: 1
  },
  {
    id: "2",
    title: "Database System Concepts",
    edition: "6th",
    copyright: 2010,
    language: "ENGLISH",
    pages: 1376,
    author: "Abraham Silberschatz",
    author_id: 1,
    publisher: "John Wiley & Sons",
    publisher_id: 1
  },
  {
    id: "3",
    title: "Computer Networks",
    edition: "5th",
    copyright: 2010,
    language: "ENGLISH",
    pages: 960,
    author: "Andrew S. Tanenbaum",
    author_id: 2,
    publisher: "Pearson Education",
    publisher_id: 2
  },
  {
    id: "4",
    title: "Modern Operating Systems",
    edition: "4th",
    copyright: 2014,
    language: "ENGLISH",
    pages: 1136,
    author: "Andrew S. Tanenbaum",
    author_id: 2,
    publisher: "Pearson Education",
    publisher_id: 2
  }
];

const app = express.Router();

// Get all books
app.get('/', (req, res) => {
  res.json(books);
});

// Get a specific book by ID
app.get('/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});

// Add a new book
app.post('/', (req, res) => {
  const newBook = req.body;
  const exists = books.some(b => b.id === newBook.id);

  if (exists) {
    return res.status(400).send('Book already exists');
  }

  books.push(newBook);
  res.status(201).json(newBook);
});

// Update an existing book
app.put('/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);

  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  res.json(books[bookIndex]);
});

// Delete a book by ID
app.delete('/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);

  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);
  res.status(204).send(); // No content
});

const exp = express();
exp.use(bodyParser.json());
exp.use('/.netlify/functions/books', app);

module.exports = exp;
module.exports.handler = serverless(exp);
