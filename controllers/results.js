const Course = require("../models/course");

module.exports = {
  getResultPage: (req, res) => {
    res.render("results.ejs");
  },
  getResults: (req, res) => {
    const chem = parseInt(req.body.chemistry);
    const bio = parseInt(req.body.biology);
    const math = parseInt(req.body.mathematics);
    const phy = parseInt(req.body.physics);
    const econs = parseInt(req.body.economics);
    const agric = parseInt(req.body.agricultural_science);
    const geo = parseInt(req.body.geography);
    const personalityType = req.body.personality;

    Course.find({
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
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },
};

// app.post("/result", (req, res) => {
//   //was /api/courses/result
//   const chem = parseInt(req.body.chemistry);
//   const bio = parseInt(req.body.biology);
//   const math = parseInt(req.body.mathematics);
//   const phy = parseInt(req.body.physics);
//   const econs = parseInt(req.body.economics);
//   const agric = parseInt(req.body.agric);
//   const geo = parseInt(req.body.geography);
//   const personalityType = req.body.personality;

//   //{$and: [{"courseCombo.chemistry": {$lte: 7}}, {"courseCombo.biology": {$lte: 8}}, {"courseCombo.mathematics": {$lte: 8}}, {"courseCombo.economics": {$lte: 5}}, {"courseCombo.geography": {$lte: 7}}, {"courseCombo.agricultural_science": {$lte: 9}}, {"courseCombo.physics": {$lte: 7}} ]}

//   dbConnection
//     .find({
//       $and: [
//         { "courseCombo.chemistry": { $lte: chem } },
//         { "courseCombo.biology": { $lte: bio } },
//         { "courseCombo.mathematics": { $lte: math } },
//         { "courseCombo.economics": { $lte: econs } },
//         { "courseCombo.geography": { $lte: geo } },
//         { "courseCombo.agricultural_science": { $lte: agric } },
//         { "courseCombo.physics": { $lte: phy } },
//         { personalityType: personalityType },
//       ],
//     })
//     .toArray()
//     .then((result) => res.json(result))
//     .catch((err) => console.log(err));
// });
