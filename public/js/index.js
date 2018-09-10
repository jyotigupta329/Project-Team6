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

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

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