var express = require('express'),
    wsio = require('websocket.io');

var app = express.createServer();

var ws = wsio.attach(app);

app.use(express.static('public'));

var positions = {},
    total = 0;
ws.on('connection', function (socket) {
    socket.id = ++total;

    socket.send(JSON.stringify(positions));

    socket.on('message', function (msg) {
        try {
            var pos = JSON.parse(msg);
        } catch(e) {
            return;
        }
        positions[socket.id] = pos;
        broadcast(JSON.stringify({type: "position", pos: pos, id: socket.id}));
    });

    socket.on('close', function () {
        delete positions[socket.id];
        broadcast(JSON.stringify({type: "disconnect", id: socket.id}));
    });

    function broadcast(msg) {
        for (var i = 0, l = ws.clients.length; i < l; i++) {
            if (ws.clients[i] && socket.id != ws.clients[i].id){
                ws.clients[i].send(msg);
            }
        }
    }
})

app.listen(3000);












