const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as agrument");
  process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://wasiqurz011:${password}@cluster0.bnexivz.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

console.log("connecting to url", url);
mongoose.connect(url).then(() => {
  console.log("connected to ", url);
});

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// eslint-disable-next-line quotes
const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "CSS is hard",
  important: true,
});

note.save().then(result => {
  console.log("note saved!");
  console.log(result);
  mongoose.connection.close();
});

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });