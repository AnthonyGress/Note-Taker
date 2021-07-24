const path = require("path");
const router = require("express").Router();
// our notes app endpoint
router.get('/notes', (req,res) => {
   res.sendFile(path.join(__dirname, "../public/notes.html"));
})

// since this file is loaded last,
// if the endpoint is not /, /notes, or /api/notes send them to the homepage
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
