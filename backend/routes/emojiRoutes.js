const express = require("express");
const multer = require("multer");
const path = require("path");
const Emoji = require("../models/Emoji");
const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Correct path where to uploads folder
  },
  filename: (req, file, cb) => {//correct name of the file 
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); //multer instanced for storage

// Route for uploading emojis
router.post("/upload", upload.single("emojiImage"), (req, res) => {
  if (!req.file || !req.body.name) {
    return res.status(400).json({ error: "Name and file are required" });
  }

  const newEmoji = new Emoji({
    name: req.body.name,
    imageUrl: `http://localhost:3000/uploads/${req.file.filename}`, //save new emoji with this url in databse.
  });

  newEmoji
    .save()
    .then((emoji) => res.json(emoji))
    .catch((err) =>
      res.status(400).json({ error: "Error saving emoji: " + err.message })
    );
});

// Route for geting all the  emojis
router.get("/", (req, res) => {
  Emoji.find()
    .then((emojis) => res.json(emojis))
    .catch((err) =>
      res.status(400).json({ error: "Error fetching emojis: " + err.message })
    );
});

module.exports = router;
