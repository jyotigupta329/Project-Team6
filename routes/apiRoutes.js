var db = require("../models");
var chalk = require("chalk");

const request = require('request');

// Authentication requirements:  Not sure which files they'll go in, but including them so we have them:
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
// Authentication additions end.


var dataFromQuotes;
// --------------------------------------------------------//
// Dependencies for Spotify API
//--------------------------------------------------------//
var Spotify = require("node-spotify-api");
var keys = require("./../keys");
var spotify = new Spotify(keys.spotify);

module.exports = function (app) {

  // NORMAL ROUTES

  // An open call that lists all users in the DB.  Turn this OFF before production for safety of information.
  app.get("/api/register", function (req, res) {
    console.log("Checking what's in the db with a GET call:");
    db.User.findAll({}).then(function (result) {
      res.json(result, null, 2);
    });
  });

  // app.post("/verifiedit"), function (req, res) {
  //   console.log("VERIFIED IT REQ.BODY: ", req.body)
  //   res.json(req);
  // };

  // app.get("/verifiedit"), function (req, res) {
  //   res.json(req);
  // };

  // AUTH ROUTES
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
        // if (error) {
        //   res.json({ Error: true, Message: "Username is taken. Try another." });
        // } else {
        // // res.json({ Success: true, Results: results });
        // return true;
        // }
      });
    });
  });

  app.post("/api/login", function (req, res) {
    console.log("Hitting api login");
    console.log(req.body);
    console.log(req.body.userName);
    console.log(req.body.password);
    if (!req.body.userName || !req.body.password) {
      return res.json({ Error: true, Message: "Username or password are missing." });
    }
    const { userName, password } = req.body;
    db.User.findOne({
      where: {
        userName: userName
      }
    })
      .then(function (results) {
        console.log(userName);
        console.log(password);
        bcrypt.compare(password, results.password, function (error, bcryptResult) {
          if (error) {
            return res.json({ Error: true, Message: "Incorrect password." });
          } else {
            if (bcryptResult) {
              var token = jwt.sign({ id: results.id, expires: +Date.now() + 2592000000 }, process.env.JWT_SECRET)
              return res.json({ Success: true, token: token });
            } else {
              return res.json({ Error: true });
            }
          }
        });
      })
      .catch(function (error) {
        if (error) {
          return res.json({ Error: true, Message: "Error logged." });
        }
        if (results.length === 0) {
          return res.json({ Error: true, Message: "No user with that userName." });
        }
        console.log(error);
      });

  });


  //SPOTIFY STUFF
  app.get("/api/result/:keyword", function (req, res) {
    var keyWord = req.params.keyword;
    var hsbResultObject = {
      quote: null,
      song: null
    };


    var optionspost = {
      url: 'https://api.paperquotes.com/apiv1/quotes/?tags=' + keyWord + '&limit=10',
      headers: {
        'Authorization': 'TOKEN e2eeb1aa9f32eb07fa04595a0c457ecb6fadb772'
      },
      json: true
    };

    spotifySong(keyWord, function (err, result) {
      if (err) throw err;
      hsbResultObject.song = result.album.external_urls.spotify;

      request.get(optionspost, function (error, response, body) {
        if (error) {
          console.error(error);
        } else {
          console.info(body);
          var quotesObject = [];
          for (var i = 0; i < body.results.length; i++) {
            quotesObject.push(body.results[i].quote);
          }
          hsbResultObject.quote = quotesObject;
          res.render("results", hsbResultObject);
        }
      });
    });
  });

  function spotifySong(keyWord, callback) {
    spotify
      .search({ type: 'track', query: keyWord })
      .then(function (response) {
        var jsonData = response.tracks.items[0];
        console.log(jsonData);
        var logSpotify =
          chalk.bold.yellow("\nArtist(s): ") + jsonData.album.artists[0].name +
          chalk.bold.yellow("\nThe song's name: ") + jsonData.name +
          chalk.bold.yellow("\nThe album that the song is from: ") + jsonData.album.name;
        console.log("\n----------------------- movie-this command -----------------------------");
        console.log(logSpotify);
        console.log("\n-----------------------------------------------------------------------\n");
        return callback(null, jsonData);
      })
      .catch(function (err) {
        console.log(err);
        return callback(err);
      });
  }
}