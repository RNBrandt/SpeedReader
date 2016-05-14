$(document).ready(function () {
  bindListeners();
});

function bindListeners(){
  $("#url").on("submit", getWebsite)
  $("#start-button").on("click", runArticle)
  $("#pause").on("click", pressPause)
  $("#stop").on("click", pressStop)
}

function CreateSpeedReedObject(response){
  this.title = response["title"];
  this.text = response["text_array"];
  this.i = 0;
  this.pause = false;
}

function getWebsite(e){
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

function addTitle(speedReedObject){
 $("#title").html('Ready to Read "'+speedReedObject.title+'"?');
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
  speedReedObject.pause = false;
  $("#text-object").html("");
}

function pressStop(){
  $(".amountRange").removeClass("hidden");
  $("#slider").removeClass("hidden");
  $("#start-button").removeClass("hidden")
  $("#stop").addClass("hidden")
  $("#pause").addClass("hidden")
  $("#reading").addClass("hidden");
  $(".panel-body").html("");
  $("#website-input").removeClass("hidden")
  switchButton();
  clearObject();
}
