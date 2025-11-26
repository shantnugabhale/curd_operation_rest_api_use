const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://flutteruser:flutter1234@cluster0.hxdhn0x.mongodb.net/notesdb?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const NoteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Note = mongoose.model("Note", NoteSchema);

app.get("/", (req, res) => {
  res.send("API Working!! 🚀");
});

app.post("/notes", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.put("/notes/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at: http://localhost:${port}`);
  console.log(`Server accessible from network at: http://YOUR_IP_ADDRESS:${port}`);
  console.log(`Make sure your device and computer are on the same network!`);
});
