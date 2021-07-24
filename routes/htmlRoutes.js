const path = require("path");
const router = require("express").Router();

router.get('/notes', (req,res) => {
   res.sendFile(path.join(__dirname, "../public/notes.html"));
})

// send all other requests 404 error
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
