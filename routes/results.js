const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/results");

router.get("/", resultsController.getResultPage);
router.post("/my-result", resultsController.getResults);

module.exports = router;
