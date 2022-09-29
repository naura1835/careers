const Course = require("../models/course");

module.exports = {
  getCourses: (req, res) => {
    Course.find()
      .then((results) => {
        res.render("courses.ejs", { courses: results });
      })
      .catch((err) => console.log(err));
  },

  getCourseDetail: (req, res) => {
    const course = req.params.id;

    Course.findOne({ slug: course })
      .then((result) => {
        res.render("details.ejs", { course: result });
      })
      .catch((err) => console.log(err));
  },

  searchCourse: (req, res) => {
    const { searchString } = req.query;

    Course.aggregate([
      {
        $search: {
          index: "searchCourse",
          text: {
            query: searchString,
            path: {
              wildcard: "*",
            },
            fuzzy: {},
          },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          slug: 1,
        },
      },
    ])
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },
};
