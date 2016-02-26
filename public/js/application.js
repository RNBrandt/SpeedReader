$(document).ready(function () {
  bindeListeners();
});

var bindeListeners = function(){
  $("#url").on("submit", getWebsite),
  $("#500Wpm").on("click", fiveHundred)
}

var getWebsite = function(e){
  e.preventDefault();

  $.ajax({
    method: "post",
    url: "/websites",
    data: $(this).serialize(),
    dataType: 'json'
  }).done(function(response){
    // console.log(response)
    var title = response["title"]
    text = response["text_array"]
    var panel = $(".panel-body")
    // console.log(text)
    $(".panel-title").html("Ready to Read "+title+"?")
    // $.each(response, function(index, value){
    // setTimeout(function(){
    //   panel.show(value)
    //   }, 5000)
    // })This bit will come at a later push, right now I have the text, and I'll put up a title
  })
}

var fiveHundred = function(e){
  console.log(text)
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},160);
}

var fiveHundred = function(e){
  console.log(text)
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},160);
}

var fiveHundred = function(e){
  console.log(text)
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},160);
}

var fiveHundred = function(e){
  console.log(text)
  var i = 0
  setInterval(function(){
    $(".panel-body").html(text[i++])},160);
}
