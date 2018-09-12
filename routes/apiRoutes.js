var db = require("../models");

// --------------------------------------------------------//
// Dependencies for Authentication
//--------------------------------------------------------//
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")

// --------------------------------------------------------//
// Dependencies for Spotify API
//--------------------------------------------------------//
var Spotify = require("node-spotify-api");
var keys = require("./../keys");
var spotify = new Spotify(keys.spotify);

module.exports = function (app) {

  // An open call that lists all users in the DB.  Turn this OFF before production for safety of information.
  app.get("/api/register", function (req, res) {
    console.log("Checking what's in the db with a GET call:");
    db.User.findAll({}).then(function (result) {
      res.json(result, null, 2);
    });
  });

  // The POST that pushes a new user into the db.
  app.post("/api/register", function (req, res) {
    console.log("REGISTER API CALLED PRE-ENCRYPTION.");
    console.log("And is giving: ", req.body);
    if (!req.body.userName || !req.body.password) {
      return res.json({ Error: true, Message: "Username or password are missing." });
    }
    const { userName, password } = req.body;
    bcrypt.hash(password, 8, function (error, hash) {
      if (error) {
        res.json({ Error: true, Message: "Problem creating account." });
      }
      db.User.create({
        userName: userName,
        password: hash
      }).then(function (error, results) {
        if (error) {
          res.json({ Error: true, Message: "Username is taken. Try another." });
        }
        res.json({ Success: true, Results: results });
      });
    });
  });

  app.post("/api/login", function (req, res) {
    if (!req.body.userName || !req.body.password) {
      return res.json({ Error: true, Message: "Username or password are missing." });
    }
    const { userName, password } = req.body;

    
///////////////////////////////////CURRENT LOCATION. WORK OUT HOW TO MAKE IT WORK THE FIRST WAY BY CHANGING VALUES IN USER.JS TO RETURN A CORRECT RESULT.

      //This is how the string SHOULD work, but user/users syntax error.
    // db.User.findAll({
    //   where: {
    //     userName: userName
    //   }
    // })

    // So instead we will try calling it directly, but still with sequelize:
    db.User.sequelize.query("SELECT * FROM 'users' WHERE 'users'.'userName' = ?", [userName], {type: sequelize.QueryTypes.SELECT})

    .then(function (error, results) {
      if (error) {
        console.log(results);
        return res.json({ Error: true, Message: "Error logged." });
      }
      if (results.length === 0) {
        return res.json({ Error: true, Message: "No user with that userName." });
      }
      bcrypt.compare(password, results[0].password, function (error, bcryptResult) {
        if (error) {
          return res.json({ Error: true, Message: "Incorrect password." });
        } else {
          if (bcryptResult) {
            var token = jwt.sign({ id: results[0].id, expires: +Date.now() + 2592000000 }, process.env.JWT_SECRET)
            return res.json({ Success: true, Token: token });
          } else {
            return res.json({ Error: true });
          }
        }
      });
      });
  });




// Get all songs form spotify
app.get("/api/findSong/:keyword", function (req, res) {
  var keyWord = req.params.keyword;
  spotifySong(keyWord, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
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






  //DO WE WANT THIS IN THIS FILE?  I feel like it might 'belong' somewhere besides in our api routing?
  //CODING THIS OUT IN MY VERSION UNTIL I GET SPOTIFY KEYS.
  // function spotifySong(keyWord, callback) {
  //   spotify
  //     .search({ type: 'track', query: keyWord })
  //     .then(function (response) {
  //       var jsonData = response.tracks.items[0];
  //       console.log(jsonData);
  //       var logSpotify =
  //         chalk.bold.yellow("\nArtist(s): ") + jsonData.album.artists[0].name +
  //         chalk.bold.yellow("\nThe song's name: ") + jsonData.name +
  //         chalk.bold.yellow("\nThe album that the song is from: ") + jsonData.album.name;
  //       console.log("\n----------------------- movie-this command -----------------------------");
  //       console.log(logSpotify);
  //       console.log("\n-----------------------------------------------------------------------\n");
  //       return callback(null, jsonData);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //       return callback(err);
  //     });
  // };
};