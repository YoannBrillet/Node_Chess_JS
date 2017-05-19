const SocketServer = require('socket.io');
var joueurs = [];
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const FILENAME = __dirname;


var server = http.createServer();


const httpServer = server.on('request', function(request, response) {
  console.log('REQUEST');
  //Recupération de l'url de la page pour connaître le lien direct.
  var page = url.parse(request.url)
    .pathname;

  console.log(page);

  //On récupére l'extention si elle existe
  var ext = path.extname(page);

  //si il n'y a pas d'extantion et que le nom de la page et / on affiche index.html et sinon on rajoute .html au nom de la page et si elle existe on l'affiche sinon on affiche la page d'erreur
  if (ext == "") {
    if (page == "/") {
      page = "/index.html";
      console.log(page);
      var lien = fs.createReadStream(FILENAME + page);
      lien.pipe(response);
    } else {
      page = page + ".html";
      console.log(page);
      var test = fs.existsSync(FILENAME + page);
      console.log("Existe : " + test);
      if (test == true) {
        var lien = fs.createReadStream(FILENAME + page);
        lien.pipe(response);
      } else {
        var lien = fs.createReadStream("./pages/erreur404.html");
        lien.pipe(response);
      }
    }

  }
  //Si l'extention et egale à .html alors on affiche la page si elle existe au cas contraire on affiche la page d'erreur
  else if (ext == ".html") {
    var test = fs.existsSync(FILENAME + page);
    console.log("Existe : " + test);
    if (test == true) {
      var lien = fs.createReadStream(FILENAME + page);
      lien.pipe(response);
    } else {
      var lien = fs.createReadStream("./pages/erreur404.html");
      lien.pipe(response);
    }
  }
  //On test si c'est une image et on l'affiche
  else if (ext == ".jpg" || ext == ".png" || ext == ".gif") {
    var lien = fs.createReadStream(FILENAME + page);
    lien.pipe(response);
  } else {
    console.log("erreur");
    var lien = fs.createReadStream("./pages/erreur404.html");
    lien.pipe(response);
  }

  console.log("");

});

const io = new SocketServer(httpServer);
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
  1
});

httpServer.listen(3000);

console.log('HTTP SERVER STARTED');
