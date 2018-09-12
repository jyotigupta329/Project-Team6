var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    res.render("index");
  });
  
   app.get("/results", function(req, res) {
    res.render("results");
  });

  app.get("/results", function(req, res) {
    res.render("results");
  });

  // // The route to go to a page for logged in users:  STILL IN DEVELOPMENT
  // app.post("/verified", passport.authenticate('jwt', { session: false }), function(req, res) {
  //   //WRAP THIS IN IF LOGIC TO GO BASED ON JWT AUTH.
  //   res.render("verified");
  // });


  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });



  //Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  
};
