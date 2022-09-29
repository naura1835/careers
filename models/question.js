const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: Number,
  tag: String,
  question: String,
});

module.exports = mongoose.model("Question", questionSchema);
