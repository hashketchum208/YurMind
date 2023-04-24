const express = require('express');
const notes = require('./notes');
const app = express();

app.use('./notes.js', notes);

module.exports = app;