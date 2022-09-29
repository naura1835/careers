const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses");

router.get("/", coursesController.getCourses);
router.get("/search", coursesController.searchCourse);
router.get("/:id", coursesController.getCourseDetail);

module.exports = router;
