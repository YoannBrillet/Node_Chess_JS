const SocketServer = require('socket.io');
var joueurs = [];
const express = require('express');
//const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
var app = express();


//var server = http.createServer();


//const httpServer = server.on('request', function(request, response) {
//console.log('REQUEST');
//Recupération de l'url de la page pour connaître le lien direct.
var nodeserver = app.get(function() {
  app.use(express.static('public'));
  app.use(express.directory(__dirname));
  app.use(express.errorHandler());
  app.get('/', function(req, res) {
    res.send('Hello World!');
  });
  console.log("");

});

const io = new SocketServer(nodeserver);
io.on('connection', (socket) => {
  console.log('SOCKET CONNECTION : ' + socket.id);
  joueurs.push(socket);
  socket.on('pseudo', (data) => {
    console.log('MESSAGE RECEIVED : ' + data.text + ' FROM ' + socket.id);

    setTimeout(() => {
      socket.emit('reponse', {
        text: 'Bien recu'
      });
    }, 2000)

  });

  socket.on('disconnect', (data) => {
    for (var i in joueurs) {
      if (joueurs[i].id == socket.id) {
        joueurs.splice(i, 1);
        break;
      }
    }
  })

});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
//httpServer.listen(3001);


console.log('HTTP SERVER STARTED');
