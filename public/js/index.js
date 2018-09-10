$(document).ready(function() {
$('#login').webuiPopover({url:'#login-form'});
});

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      data: userFeeling
    }).then(function(){
      console.log("User Feeling detected.");
      var queryURL = "https://healthruwords.p.mashape.com/v1/quotes/"
      $.ajax({
        type: "GET",
        url: "https://healthruwords.p.mashape.com/v1/quotes/",
        headers: {
          "X-Mashape-Key": "ZWnq8fKzw8mshT3ZBt7cDyxQcjX7p1pVHfSjsn86RwKEjG3pF9"
          
        }
      })
    });
  });
});

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$("#submit").on("click", function(event){
  event.preventDefault();
  var temp = $("#feeling").val().trim();
  var userFeeling = {
    feeling: temp
  };
  $.ajax("/api/quotes",{
    type: "POST",
    data: userFeeling
  }).then(function(){
    console.log("User Feeling detected.");
  });
});

