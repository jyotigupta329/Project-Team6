var db = require("../models");
var chalk = require("chalk");

// --------------------------------------------------------//
// Dependencies for Spotify API
//--------------------------------------------------------//
var Spotify = require("node-spotify-api");
var keys = require("./../keys");
var spotify = new Spotify(keys.spotify);

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
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
};

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