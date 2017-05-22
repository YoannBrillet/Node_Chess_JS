var socket = io.connect('http://localhost:3000');

// Connection de l'utilisateur
$('#login form')
  .submit(function(connecter) {
    connecter.preventDefault();
    var user = {
      username: $('#login input')
        .val()
        .trim()
    };
    if (user.username.length > 0) { // vérification de la contenance
      socket.emit('user-login', user);
      $('body')
        .removeAttr('id');
      $('#chat input')
        .focus();
    }
  });

// Envoi de messages
$('#chat form')
  .submit(function(connecter) {
    connecter.preventDefault();
    var message = {
      text: $('#envoi')
        .val()
    };
    $('#envoi')
      .val('');
    if (message.text.trim()
      .length !== 0) { // Gestion message vide
      socket.emit('chat-message', message);
    }
    $('#chat input')
      .focus();
  });


socket.on('chat-message', function(message) {
  $('#messages')
    .append($('<li>')
      .html('<span >' + message.username + '</span> ' + message.text));
});

//message du chat
socket.on('Message du Chat', function(message) {
  $('#messages')
    .append($('<li class="' + message.type + '">')
      .html('<span >information</span> ' + message.text));
});
