var socket = io();

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

var setCurrentPage = function(url) {
    $('h2 span').html(url || "/");
    $("#menu-nav a[href='" + url + "']").fadeTo(500, 0.3);
};

$('#menu-nav a').click(function(event){
  event.preventDefault();
  var targetUrl = $(this).attr('href'),
      targetTitle = $(this).attr('title');

  $("#menu-nav a[href='" + window.location.pathname + "']")

  window.history.pushState({url: "" + targetUrl + ""}, targetTitle, targetUrl);
  setCurrentPage(targetUrl);
});

window.onpopstate = function(event) {
  $("#menu-nav a").fadeTo('fast', 1.0);
  setCurrentPage(event.state ? event.state.url : null);
};
