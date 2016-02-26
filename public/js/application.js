$(document).ready(function () {
  bindeListeners();
});

var bindeListeners = function(){
  $("#url").on("submit", getWebsite)
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
    var text = response["text_array"]
    var panel = $(".panel-body")
    $(".panel-title").html("Ready to Read "+title+"?")
    // $.each(response, function(index, value){
    // setTimeout(function(){
    //   panel.show(value)
    //   }, 5000)
    // })This bit will come at a later push, right now I have the text, and I'll put up a title
  })
}
