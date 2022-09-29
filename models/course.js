const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  courseCombo: {
    physics: Number,
    chemistry: Number,
    biology: Number,
    mathematics: Number,
    agricultural_science: Number,
    geography: Number,
    economics: Number,
  },
  responsibilities: [String],
  placeOfWork: String,
  personalityType: String,
  slug: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
