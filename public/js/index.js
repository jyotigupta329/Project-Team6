$(document).ready(function () {
  $('#login').webuiPopover({ url: '#login-form' });
  $('#register').webuiPopover({ url: '#register-form' });
});

$(function () {
  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("inspired")
    var temp = $("#feeling").val().trim();
    var userFeeling = {
      feeling: temp
    };
    $.ajax("/api/findSong/" + temp, {
      type: "GET"
    }).then(function (spotifyRes) {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = "https://api.paperquotes.com/apiv1/quotes/?tags=" + temp + "&limit=10";
    console.log(targetUrl);

    $.ajax({
      type: "GET",
      url: proxyUrl + targetUrl,
      headers: {
        'Authorization': 'TOKEN e2eeb1aa9f32eb07fa04595a0c457ecb6fadb772'
      }
    }).then(function (response) {
      console.log(response.results[0].quote);
      var quotesObject = [];
      for (var i = 0; i < response.results.length; i++) {
        quotesObject.push(response.results[i].quote);
      }
      // console.log(quotesObject);
      $.post("/api/quotes", {
        quotesObject
      }).then(function (response) {
        console.log("response");
        window.location.href = "http://localhost:3000/api/quotes"
      }); //close post request

    }); //close get ajax call
    }); //close spotify ajax
  });//close submit on-click
});   //close function()





