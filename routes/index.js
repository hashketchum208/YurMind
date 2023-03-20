const express = require('express')
const notes = require('./api/notes')

const app = express();

app.use('./notes', notes);
// const api = require('./api')

module.exports = app;