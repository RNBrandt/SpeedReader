$(document).ready(function () {
  bindListeners();
});

var bindListeners = function(){
  $("#url").on("submit", getWebsite)
  $("#slider").on("click", runArticle)
  $("#pause").on("click", pressPause)
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

function intervalLoop(speed){
  var i = 0;
  var pause = false;
  console.log(pause);
  if ((i <= text.length) && (pauseSwitch() != true)){
    setInterval(function(){
      $(".panel-body").html(text[i++])},speed);
    }
  else return
}

function runArticle(){
  var speed = $('input[name=amountRange]').val()
  var WPM = 60000 / speed;
  intervalLoop(WPM);
}

function pauseSwitch(){
  pressPause;
}

function pressPause(){
  console.log("article should be paused");
  return pause = true;
  // console.log(pause)
}
