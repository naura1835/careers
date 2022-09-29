const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const mongoose = require("mongoose");

// const connectDB = require("./config/database");
const homeRouter = require("./routes/home");
const coursesRouter = require("./routes/courses");
const assessmentRouter = require("./routes/assessment");
const resultsRouter = require("./routes/results");

require("dotenv").config();

const app = express();
const PORT = 5000;

// connectDB();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(express.json());

app.use("/", homeRouter);
app.use("/courses", coursesRouter);
app.use("/assessment", assessmentRouter);
app.use("/results", resultsRouter);

//i don't think i need to search based on personality
// app.get("/api/personality/:type", (req, res) => {
//   const personalityType = req.params.type.toLocaleUpperCase();

//   dbConnection
//     .find({ personalityType: personalityType })
//     .toArray()
//     .then((results) => res.json(results))
//     .catch((err) => console.log(err));
// });

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
