var db = require("../models");

//Auth Dependencies. We may move passport to its own file, but getting it working for now:
//////////////////////////////////////////////////////////////////////////////////////////
// var check = require("../authcheck.js");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")

const passportOps = {
  jwtFromRequest: ExtractJwt.fromBodyField(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(passportOps, (jwt_payload, done) => {
  connection.query("SELECT * FROM users WHERE id = ?", [jwt_payload.id], function (err, results) {
    console.log(results);
    if (err) {
      return done(err, false);
    }
    if (results.length < 1) {
      return done(null, false);
    }

    done(null, results[0]);
  })
}));



//////////////////////////////////////////////////////////////////////////////////////////////////


//WORKING STUFF:
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/results", function (req, res) {
    res.render("results");
  });

  app.get("*", function (req, res) {
    res.render("404");
  });
};
