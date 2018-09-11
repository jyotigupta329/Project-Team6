
$(document).ready(function () {
  $('#login').webuiPopover({ url: '#login-form' });
});


$(function () {
  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("inspired");
    var temp = $("#feeling").val().trim();
    // var userFeeling = {
    //   feeling: temp
    // };
    $.ajax("/api/findSong/" + temp, {
      type: "GET"
    }).then(function (res) {
      console.log("User Feeling detected.");
      console.log(res);
    });
  });
});
