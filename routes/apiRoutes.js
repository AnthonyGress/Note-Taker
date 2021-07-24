const router = require("express").Router();
const dbEngine = require('../db/dbEngine')



router.get("/notes", (req, res) => {
  console.info(`${req.method} request received to /api/notes`);

  dbEngine.getNotes().then((data) => res.json(JSON.parse(data)));
});

router.post("/notes", (req, res) => {
  // incoming param is stringified note object
  console.info(`${req.method} request received to get /api/notes`);
  // call addNote function with the note object
  dbEngine.addNote(req.body);
  res.json(`${req.method} request received to get /api/notes`);

});

router.delete("/notes/:id", (req, res) => {
  // incoming param is id json
  console.info(`${req.method} request received to /api/notes`);
  // call function to drop note :id from db
  dbEngine
    .getNotes()
    // pass parsed db array to deleteNote func along with the id clicked from url
    .then((data) => dbEngine.deleteNote(JSON.parse(data), req.params.id))
  res.json(`${req.method} request received to get /api/notes`);

});

// send all other requests 404 error
router.get("*", (req, res) => {
  console.error("404 bad request");
});

module.exports = router;
