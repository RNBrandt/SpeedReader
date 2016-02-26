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
    url: "/users/1/websites",
    data: $(this).serialize(),
    dataType: 'json'
    // this will need to change tomorrow
  }).done(function(response){
    var panel = $(".panel-body")
    $.each(response, function(index, value){
    setTimeout(function(){
      panel.show(value)
      }, 5000)
    })
  })
}
