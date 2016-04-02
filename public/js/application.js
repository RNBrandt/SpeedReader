$(document).ready(function () {
  bindListeners();
});

var bindListeners = function(){
  $("#url").on("submit", getWebsite)
  $("#slider").on("click", runArticle)
  $("#pause").on("click", pressPause)
}

var getWebsite = function(e){
  var CreateSpeedReedObject = function(response){
    this.title = response["title"];
    this.text = response["text_array"];
    this.i = 0;
    this.pause = false;
    }
  e.preventDefault();
  $.ajax({
    method: "post",
    url: "/websites",
    data: $(this).serialize(),
    dataType: 'json',
  }).done(function(response){
    speedReedObject = new CreateSpeedReedObject(response);
    addTitle(speedReedObject);
    })
}

var addTitle = function(speedReedObject){
 $(".panel-title").html("Ready to Read "+speedReedObject.title+"?");
  }

 function intervalLoop(speedReedObject, speed){
  setInterval(function(){
    if ((speedReedObject.i <= speedReedObject.text.length) && (speedReedObject.pause != true)){
      $(".panel-body").html(speedReedObject.text[speedReedObject.i++])
    } else setTimeout(function(){console.log("yo")},1)
  }, speed);
}

function runArticle(){
  var speed = $('input[name=amountRange]').val()
  var WPM = 60000 / speed;
  intervalLoop(speedReedObject, WPM);
}

function pressPause(){
  speedReedObject.pause = !speedReedObject.pause;
}

