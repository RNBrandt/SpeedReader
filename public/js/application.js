$(document).ready(function () {
  bindListeners();
});

var bindListeners = function(){
  $("#url").on("submit", getWebsite)
  $("#slider").on("click", runArticle)
}

var getWebsite = function(e){
  e.preventDefault();
  $.ajax({
    method: "post",
    url: "/websites",
    data: $(this).serialize(),
    dataType: 'json',
  }).done(function(response){
    var title = response["title"]
    text = response["text_array"]
    var panel = $(".panel-body")
    $(".panel-title").html("Ready to Read "+title+"?");
  })
}

// var threeHundred = function(e){
//   intervalLoop(200);
// }

function intervalLoop(speed){
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},speed);
}

function runArticle(){
  var speed = $('input[name=amountRange]').val()
  var WPM = 60000 / speed;
  intervalLoop(WPM);
}
