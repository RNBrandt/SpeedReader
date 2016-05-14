$(document).ready(function () {
  bindListeners();
});

var bindListeners = function(){
  $("#url").on("submit", getWebsite)
  $("#start-button").on("click", runArticle)
  $("#pause").on("click", pressPause)
  $("#stop").on("click", pressStop)
}

var CreateSpeedReedObject = function(response){
  this.title = response["title"];
  this.text = response["text_array"];
  this.i = 0;
  this.pause = false;
}

var getWebsite = function(e){
  e.preventDefault();
  $.ajax({
    method: "post",
    url: "/websites",
    data: $(this).serialize(),
    dataType: 'json',
  }).done(function(response){
    speedReedObject = new CreateSpeedReedObject(response);
    addTitle(speedReedObject);
    $("#reading").removeClass("hidden");
    $("#website-input").addClass("hidden")
  })
}

var addTitle = function(speedReedObject){
 $("#title").html('Ready to Read "'+speedReedObject.title+'"?');
 $("#slider").removeClass("hidden");
 $("#start-button").removeClass("hidden");
}

function intervalLoop(speedReedObject, speed){
  setInterval(function(){
    if ((speedReedObject.i <= speedReedObject.text.length) && (speedReedObject.pause != true)){
      $("#text-object").html(speedReedObject.text[speedReedObject.i++])
    } else setTimeout(function(){},1)
  }, speed);
}

function runArticle(){
  var speed = $('input[name=amountRange]').val()
  var WPM = 60000 / speed;
  $("#slider").addClass("hidden");
  $("#start-button").addClass("hidden")
  $("#pause").removeClass("hidden");
  $("#stop").removeClass("hidden")
  intervalLoop(speedReedObject, WPM);
  switchButton()
}

function pressPause(){
  speedReedObject.pause = !speedReedObject.pause;
  switchButton()
}

function switchButton(){
  if (speedReedObject.pause == false){
    $("#pause").html("Pause")
  }
  else{
    $("#pause").html("Resume")
  }
}

function clearObject(){
  speedReedObject.text = [];
  speedReedObject.title = [];
  speedReedObject.i = 0;
  speedReedObject.pause = false
}

function pressStop(){
  $("#text-object").html("")
  $("#slider").val(100);
  $("#wpmBox").val(100);
  $(".amountRange").removeClass("hidden");
  $("#stop").addClass("hidden")
  $("#pause").addClass("hidden")
  $("#reading").addClass("hidden");
  $(".panel-body").html("");
  $("#website-input").removeClass("hidden")
  switchButton();
  clearObject();
}

