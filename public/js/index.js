// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

//read and set any environment variables with the dotenv package:
require("dotenv").config();

// --------------------------------------------------------//
// Dependencies for Spotify API
//--------------------------------------------------------//
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);



// Add event listeners to the submit and delete buttons

$("#submit").on("click", function (event) {
  event.preventDefault();
  var temp = $("#feeling").val().trim();
  var userFeeling = {
    feeling: temp
  };
  $.ajax("/api/quotes", {
    type: "POST",
    data: userFeeling
  }).then(function (res) {
    console.log("User Feeling detected.");
    console.log(res.data);
    spotifySong(res.data);
  });
});


// --------------------------------------------------------//
// Function to call spotify API
//--------------------------------------------------------//

function spotifySong(term) {

  if (!term) {
    term = "The Sign Ace Of Base";
  }

  spotify
    .search({ type: 'track', query: term })
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
    })
    .catch(function (err) {
      console.log(err);
    });
}
