const mongoose = require("mongoose");

const emojiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Emoji = mongoose.model("Emoji", emojiSchema);

module.exports = Emoji;
