const http = require('http');
const fs = require('fs');
const SocketServer = require('socket.io');
var clients = [];

const httpServer = http.createServer((request, response) => {
    console.log('REQUEST');
    fs.readFile(__dirname + '/index.html', (err, data) => {
        response.end(data);
    });
});

const io = new SocketServer(httpServer);
io.on('connection', (socket) => {
    console.log('SOCKET CONNECTION : ' + socket.id);
    clients.push(socket);
    socket.on('message', (data) =>{
        console.log('MESSAGE RECEIVED : ' + data.text + ' FROM ' + socket.id);

        setTimeout(() => {
            socket.emit('reponse', {text: 'Bien recu'});
        }, 2000)

    });

    socket.on('disconnect', (data) => {
        for (var i in clients) {
            if (clients[i].id == socket.id){
                clients.splice(i, 1);
                break;
            }
        }
    })
1});

httpServer.listen(3000);

console.log('HTTP SERVER STARTED');
