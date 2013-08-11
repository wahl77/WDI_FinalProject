// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(document).ready(function() {

 $('body').on('click', '#search_insights', function(){
      $.ajax({
        type: "POST",
        url: '/search',
        data: { search: $('.slideshow .image.active .caption').text() },
        dataType: "json"
      }).done(add_markers);
  });

  var add_markers = function(response) {
    console.log(response.length)
    for (var i = 0; i <= response.length; i++) {
      console.log(response[i][0].caption)
    };
  };

});
