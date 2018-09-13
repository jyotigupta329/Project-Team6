var db = require("../models");
var chalk = require("chalk");

const request = require('request');

var dataFromQuotes;
// --------------------------------------------------------//
// Dependencies for Spotify API
//--------------------------------------------------------//
var Spotify = require("node-spotify-api");
var keys = require("./../keys");
var spotify = new Spotify(keys.spotify);

module.exports = function (app) {

  app.get("/api/result/:keyword", function (req, res) {
    var keyWord = req.params.keyword;
    var hsbResultObject = {
      quote: null,
      song: null
    };


    var optionspost = {
      url: 'https://api.paperquotes.com/apiv1/quotes/?tags=' + keyWord + '&limit=1',
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