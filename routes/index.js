const express = require('express');
const notes = require('./api/notes');
const app = express();

app.use('./notes.js', notes);

module.exports = app;