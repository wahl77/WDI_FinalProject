$(document).ready(function(){
  $("body").on("click", "#close_modal_big", close_modal);
  $("body").on("click", ".user_show_modal_overlay", close_modal);

});

var user_modal_box = $('.user_show_modal_box');

function close_modal() {
  $('.user_show_wrap').fadeOut('fast');
  user_modal_box.empty();
}