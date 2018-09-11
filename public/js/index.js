$(document).ready(function() {
  $('#login').webuiPopover({url:'#login-form'});
  $('#register').webuiPopover({url:'#register-form'});
  });
  
  $(function () {
    $("#submit").on("click", function (event) {
      event.preventDefault();
      console.log("inspired");
      var temp = $("#feeling").val().trim();
      $.ajax("/api/findSong/" + temp, {
        type: "GET"
      }).then(function (spotifyRes) {
        $.ajax("/api/quotes", {
          type: "POST",
          data: userFeeling
        }).then(function (QuotesRes) {
          console.log("User Feeling detected.");
          console.log("User Spotify Song detected.");
          console.log(spotifyRes);
          console.log(QuotesRes);
        });
      });
    });
  });


// $(function () {
//   $("#submit").on("click", function (event) {
//     event.preventDefault();
//     console.log("inspired")
//     var temp = $("#feeling").val().trim();
//     var userFeeling = {
//       feeling: temp
//     };
//     $.ajax("/api/quotes", {
//       type: "POST",
//       data: userFeeling
//     }).then(function () {
//       console.log("User Feeling detected.");
//     });

//   });
// });


