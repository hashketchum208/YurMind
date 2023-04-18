const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("../../db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("../../db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note found with that ID");
    });
});

// DELETE Route for a specific tip
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("../../db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      writeToFile("../../db/db.json", result);
      res.json(`Note ${noteId} has been deleted`);
    });
});

// POST Route for a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "../../db/db.json");
    res.json("Note added successfully");
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;

// const path = require('path');
// const router = require('express').Router();
// const fs = require('fs');

//     router.post("/notes", (req, res) => {
//       const db = fs.readFileSync(path.join(process.cwd(), "./db/db.json"));

//       const newNotes = [
//           ...db,
//           {
//             title: req.body.title,
//             text: req.body.text
//           },
//       ];

//       fs.writeFile(path.join("./db/db.json", newNotes, (err, data) => {
//         if (err) throw err;
//         console.log(data);
//     }));
//   })


// const path = require('path');
// const fb = require('express').Router();
// const fs = require('fs');

// fb.get('/', (req, res) => {
//   // console.info(`GET /api/note`);
//   // res.status(200).json(note);
//   readFromFile('../../db/db.json').then((data) => res.json(JSON.parse(data)))
// }); 

//   fb.post('/', (req,res) => {

//     const db = fs.readFileSync('../../db/db.json');
//     db = JSON.parse(db);
//     res.json(db)
//     const newNote = {
//       title: req.body.title,
//       text: req.body.text,
//       //will adding UUID fix this problem?/ what are some of the packages??
//       unique: true,
//     };

//     fs.writeFileSync(path.join('../../db/db.json', JSON.stringify(db)));
//     db.push(newNote)
// });

// module.exports = fb;