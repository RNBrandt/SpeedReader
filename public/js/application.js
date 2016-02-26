$(document).ready(function () {
  bindeListeners();
});

var bindeListeners = function(){
  $("#url").on("submit", getWebsite),
  $("#300Wpm").on("click", threeHundred),
  $("#400Wpm").on("click", fourHundred),
  $("#450Wpm").on("click", fourHundredFifty),
  $("#500Wpm").on("click", fiveHundred),
  $("#550Wpm").on("click", fiveHundredFifty),
  $("#600Wpm").on("click", sixHundred),
  $("#Stop").on("click", stop)
}

var getWebsite = function(e){
  e.preventDefault();
  console.log(e);
  $.ajax({
    method: "post",
    url: "/websites",
    data: $(this).serialize(),
    dataType: 'json'
  }).done(function(response){
    console.log(e)
    // console.log(response)
    var title = response["title"]
    text = response["text_array"]
    var panel = $(".panel-body")
    console.log(text)

    $(".panel-title").html("Ready to Read "+title+"?")
    // $.each(response, function(index, value){
    // setTimeout(function(){
    //   panel.show(value)
    //   }, 5000)
    // })This bit will come at a later push, right now I have the text, and I'll put up a title
  })
}

var threeHundred = function(e){
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},200);
}

var fourHundred = function(e){
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},150);
}

var fourHundredFifty = function(e){
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},133);
}

var fiveHundred = function(e){
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},120);
}

var fiveHundredFifty = function(e){
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},109);
}

var sixHundred = function(e){
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},100);
}

var stop = function(e){
  quit = false
}



