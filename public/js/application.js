$(document).ready(function () {
  bindListeners();
});

var bindListeners = function(){
  $("#url").on("submit", getWebsite);
  $("#slider").on("click", runArticle);
  $("#pause").on("click", pressPause);
  $("#stop").on("click", pressStop);
};

var CreateSpeedReedObject = function(response){
  this.title = response["title"];
  this.text = response["text_array"];
  this.i = 0;
  this.pause = false;
};

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
    $("#website-input").addClass("hidden");
  });
};

var addTitle = function(speedReedObject){
 $("#title").html("Ready to Read "+speedReedObject.title+"?");
};

var = function intervalLoop(speedReedObject, speed){
  setInterval(function(){
    if ((speedReedObject.i <= speedReedObject.text.length) && (speedReedObject.pause != true)){
      $("#text-object").html(speedReedObject.text[speedReedObject.i++])
    } else setTimeout(function(){},1)
  }, speed);
};

var runArticle = function(){
  var speed = $('input[name=amountRange]').val()
  var WPM = 60000 / speed;
  $("#slider").addClass("hidden");
  $("#pause").removeClass("hidden");
  $("#stop").removeClass("hidden")
  intervalLoop(speedReedObject, WPM);
  switchButton()
};

var pressPause = function(){
  speedReedObject.pause = !speedReedObject.pause;
  switchButton()
};

var switchButton = function(){
  if (speedReedObject.pause == false){
    $("#pause").html("Pause")
  }
  else{
    $("#pause").html("Resume")
  };
};

var clearObject = function(){
  speedReedObject.text = [];
  speedReedObject.title = [];
  speedReedObject.i = 0;
  speedReedObject.pause = false
};

var pressStop = function(){
  $("#slider").removeClass("hidden");
  $("#stop").addClass("hidden")
  $("#pause").addClass("hidden")
  $("#reading").addClass("hidden");
  $(".panel-body").html("");
  $("#website-input").removeClass("hidden")
  switchButton();
  clearObject();
};


function pauseSwitch(){
  pressPause();
  // pressPlay()
}

function pressPause(){
  console.log("article should be paused");
  pause = !pause;
  console.log(pause)
}

// function pressPlay(){
//   return pause = false
// }
