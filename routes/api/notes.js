const path = require('path');
const router = require('express').Router();
const fs = require('fs');

 
    router.post("/notes", (req, res) => {
      const db = fs.readFileSync(path.join(process.cwd(), "./db/db.json"));
  
      const newNotes = [
          ...db,
          { 
            title: req.body.title, 
            text: req.body.text 
          },
      ];
      fs.writeFile(path.join(process.cwd(), "./db/db.json"), newNotes);
    })

module.exports = router;
    
