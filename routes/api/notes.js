const path = require('path');
const fb = require('express').Router();
const fs = require('fs');

fb.get('/', (req, res) => {
  // console.info(`GET /api/note`);
  // res.status(200).json(note);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
}); 

  fb.post('/', (req,res) => {

    const db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db)
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      //will adding UUID fix this problem?/ what are some of the packages??
      unique: true,
    };

    fs.writeFileSync(path.join('db/db.json', JSON.stringify(db)));
    db.push(newNote)
});

module.exports = fb;


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

// module.exports = router;