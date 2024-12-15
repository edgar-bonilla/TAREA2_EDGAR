'use strict';

const express = require('express');
const serverless = require('serverless-http');

let publishers = [
  {
    id: 1,
    name: "John Wiley & Sons",
    country: "USA",
    founded_year: 1807,
  },
  {
    id: 2,
    name: "Pearson Education",
    country: "USA",
    founded_year: 1844,
  },
];

// Middleware para validar IDs
const validateId = (req, res, next) => {
  req.params.id = parseInt(req.params.id, 10);
  if (isNaN(req.params.id)) {
    return res.status(400).send('Invalid ID format');
  }
  next();
};

const app = express.Router();

// Obtener todos los publishers
app.get('/', (req, res) => {
  console.log('GET /publishers - All publishers');
  res.json(publishers);
});

// Obtener un publisher específico por ID
app.get('/:id', validateId, (req, res) => {
  console.log(`GET /publishers/${req.params.id}`);
  const publisher = publishers.find((p) => p.id === req.params.id);
  if (!publisher) {
    return res.status(404).send('Publisher not found');
  }
  res.json(publisher);
});

// Agregar un nuevo publisher
app.post('/', (req, res) => {
  console.log('POST /publishers - New publisher:', req.body);
  const { name, country, founded_year } = req.body;

  // Validar campos requeridos
  if (!name || !country || !founded_year) {
    return res.status(400).send('Missing required fields: name, country, founded_year');
  }

  const exists = publishers.some((p) => p.name === name);
  if (exists) {
    return res.status(400).send('Publisher already exists');
  }

  // Generar un ID único
  const newPublisher = {
    id: publishers.length > 0 ? Math.max(...publishers.map((p) => p.id)) + 1 : 1,
    name,
    country,
    founded_year,
  };

  publishers.push(newPublisher);
  res.status(201).json(newPublisher);
});

// Actualizar un publisher existente
app.put('/:id', validateId, (req, res) => {
  console.log(`PUT /publishers/${req.params.id} - Update publisher:`, req.body);
  const publisherIndex = publishers.findIndex((p) => p.id === req.params.id);

  if (publisherIndex === -1) {
    return res.status(404).send('Publisher not found');
  }

  const { name, country, founded_year } = req.body;

  // Validar campos requeridos si están presentes
  if (!name && !country && !founded_year) {
    return res.status(400).send('At least one field is required: name, country, founded_year');
  }

  publishers[publisherIndex] = {
    ...publishers[publisherIndex],
    ...req.body,
  };
  res.json(publishers[publisherIndex]);
});

// Eliminar un publisher por ID
app.delete('/:id', validateId, (req, res) => {
  console.log(`DELETE /publishers/${req.params.id}`);
  const publisherIndex = publishers.findIndex((p) => p.id === req.params.id);

  if (publisherIndex === -1) {
    return res.status(404).send('Publisher not found');
  }

  publishers.splice(publisherIndex, 1);
  res.status(204).send(); // No content
});

// Configuración del servidor Express
const exp = express();
exp.use(express.json()); // Utiliza express.json() para parsear el cuerpo de las solicitudes
exp.use('/.netlify/functions/publishers', app);

module.exports = exp;
module.exports.handler = serverless(exp);
