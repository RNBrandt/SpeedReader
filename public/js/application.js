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
  }).done(function SpeedReed(response){
  this.title = response["title"];
  this.text = response["text_array"];
  this.i = 0;
  this.pause = false;
  })
}

SpeedReed.prototype.addTitle = function(website){
 $(".panel-title").html("Ready to Read "+this.title+"?");
  })


 intervalLoop(speed){
  var i = 0;
  console.log(pause);
  pause = false;
  console.log(pause)
  setInterval(function(){
    if ((i <= text.length) && (pause != true)){
      $(".panel-body").html(text[i++])
    } else setTimeout(function(){console.log("yo")},1)
  }, speed);
}

function runArticle(){
  var speed = $('input[name=amountRange]').val()
  var WPM = 60000 / speed;
  intervalLoop(WPM);
}

function pauseSwitch(){
  pressPause();
  // pressPlay()
}

function pressPause(){
  console.log("article should be paused");
  pause = !pause;
  console.log(pause)
}

