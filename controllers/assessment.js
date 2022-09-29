const Question = require("../models/question");

const getAssessment = (req, res) => {
  res.render("assessment.ejs");
};

const getPersonalityTypeQuestions = (req, res) => {
  Question.find()
    .then((questions) => res.json(questions))
    .catch((err) => console.log(err));
};

module.exports = {
  getAssessment,
  getPersonalityTypeQuestions,
};
