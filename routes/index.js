const express = require('express')
const notes = require('./api/notes')
const app = express();
app.use('./api/notes.js', notes);

module.exports = app;