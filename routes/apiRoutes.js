var db = require("../models");

module.exports = function (app) {

  app.get("/api/register", function (req, res) {
    console.log("Checking what's in the db with a GET call:");
    db.User.findAll({}).then(function (result) {
      res.json(result, null, 2);
    });
  });

  app.post("/api/register", function (req, res) {
    console.log("REGISTER API CALLED.");
    console.log("And is giveing: ", req.body);
    db.User.create({
      userName: req.body.userName,
      password: req.body.password
    }).then(function() {});
  });



  // // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });




};
