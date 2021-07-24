const fs = require("fs");
const path = require("path");
const util = require("util");
const dbPath = path.join(__dirname,"db.json");
const readFromFile = util.promisify(fs.readFile);



// Read db and return array of notes
const getNotes = () => {
  const notes = readFromFile(dbPath);
  return notes;
}

// write files
class Note {
  constructor(title, text, id) {
    this.title = title;
    this.text = text;
    this.id = id;
  }
}

const writeToFile = (destination, content) =>
// stringify the array/object, format it to look like JS, write to db
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  // get the db file
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // parse db json file back into real js array of note objects
      const parsedData = JSON.parse(data);
      // push the new note object to the array
      parsedData.push(content);
      // write to file and stringify it for transport to front end
      writeToFile(file, parsedData);
    }
  });
};

// Add new note
const addNote = (note) => {
  // pull in random uuid generator from npm
  const { v4: uuidv4 } = require("uuid");
  console.log('adding new note');
  // use class to create a new note using the object passed from the front end
  const newNote = new Note(note.title, note.text, uuidv4());
  // write new note to the db
  readAndAppend(newNote, dbPath);
}

// Delete selected note
const deleteNote = (notes, noteId) => {
  console.log(notes);
  // create new array with everything except the matching note id
  const updatedDb = notes.filter((note) => note.id !== noteId);

  writeToFile(dbPath, updatedDb);
  };
  
  // Save that array to the filesystem


module.exports = {getNotes, addNote, deleteNote};