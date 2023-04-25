const path = require('path');
const fb = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

fb.post('/api/notes', (req, res) => {
  console.info(`${req.method} request to add a new note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully added note!')
        );
      }
    });
    const response = {
      status: 'success',
      body: newNote,
    };
    console.info(response);
    res.status(200).json(response);
  } else {
    res.status(500).json('Error in adding note');
  }
});

module.exports = fb;
    
