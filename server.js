const express = require("express");
const path = require("path");
const api = require("./routes/api/notes");
const PORT = process.env.PORT || 3000;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));


// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
  );

// GET Route for note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// app.get("/api/notes", (req, res) =>
//   res.sendFile(path.join(__dirname, "./db/db.json"))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening on port ' + PORT));
// });