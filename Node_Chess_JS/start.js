const express = require('express');
const ent = require('ent');

/*** EXPRESS ***/
const app = express();

// middleware static pour renvoyer les fichiers statiques (css, js client, images etc...)
app.use("/", express.static('public'));

// UTILISER UN MIDDLEWARE POUR RECUPERER LES DONNEES D'UNE REQUETE POST DANS req.body.params


// configuration des routes
//app.get('/', function(req, res) {
//res.end('Hello World!');
// res.render('NOM DU TEMPLATE');
//});

//app.post('/', function(req, res) {
//  var login = req.body.params.login;
//  var password = req.body.params.password
//});


// Lancement server socket io
const server = require('http')
  .Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {

  var UtilisateurConnecter;
  // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
  socket.on('disconnect', function() {
    if (UtilisateurConnecter !== undefined) {
      console.log('Utilisateur' + UtilisateurConnecter.username + 'est déconnecté');
      var MessageChat = {
        text: 'Utilisateur' + UtilisateurConnecter.username + "est déconnecter",
        type: 'logout'
      };
      socket.broadcast.emit('Message du chat', MessageChat);
    }
  });

  socket.on('user-login', function(user) {
    loggedUser = user;
    if (loggedUser !== undefined) {
      var serviceMessage = {
        text: 'Utilisateur "' + loggedUser.username + '" est connecté',
        type: 'login'
      };
      socket.broadcast.emit('service-message', serviceMessage);
    }
  });

  // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
  socket.on('message', function(message) {
    message.username = UtilisateurConnecter.username;
    io.emit('message', message);
  });
  console.log('SOCKET CONNECTION : ' + socket.id);
});


// Lancement du serveur sur le port 3000
server.listen(3000);
console.log('serveur connecter. ecoute sur le port 3000');
