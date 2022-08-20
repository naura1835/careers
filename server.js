const express = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
const PORT = 8000;

let dbConnection;

const client = new MongoClient(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(() => {
  dbConnection = client.db("career").collection("courses");
  dbConnection.createIndex({ name: "text" });
  console.log(`i feel connected`);
});

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/courses", (req, res) => {
  dbConnection
    .find()
    .toArray()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => console.log(err));
});
app.get("/api/courses/:id", (req, res) => {
  const course = req.params.id.toLocaleLowerCase();

  dbConnection
    .findOne({ name: course })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});
app.post("/api/courses/result", (req, res) => {
  const chem = parseInt(req.body.chemistry);
  const bio = parseInt(req.body.biology);
  const math = parseInt(req.body.mathematics);
  const phy = parseInt(req.body.physics);
  const econs = parseInt(req.body.economics);
  const agric = parseInt(req.body.agric);
  const geo = parseInt(req.body.geography);
  const personalityType = req.body.personality;

  //{$and: [{"courseCombo.chemistry": {$lte: 7}}, {"courseCombo.biology": {$lte: 8}}, {"courseCombo.mathematics": {$lte: 8}}, {"courseCombo.economics": {$lte: 5}}, {"courseCombo.geography": {$lte: 7}}, {"courseCombo.agricultural_science": {$lte: 9}}, {"courseCombo.physics": {$lte: 7}} ]}

  dbConnection
    .find({
      $and: [
        { "courseCombo.chemistry": { $lte: chem } },
        { "courseCombo.biology": { $lte: bio } },
        { "courseCombo.mathematics": { $lte: math } },
        { "courseCombo.economics": { $lte: econs } },
        { "courseCombo.geography": { $lte: geo } },
        { "courseCombo.agricultural_science": { $lte: agric } },
        { "courseCombo.physics": { $lte: phy } },
        { personalityType: personalityType },
      ],
    })
    .toArray()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.get("/api/personality/:type", (req, res) => {
  const personalityType = req.params.type.toLocaleUpperCase();

  dbConnection
    .find({ personalityType: personalityType })
    .toArray()
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
