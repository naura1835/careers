const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessment");

router.get("/", assessmentController.getAssessment);
router.get("/questions", assessmentController.getPersonalityTypeQuestions);

module.exports = router;
