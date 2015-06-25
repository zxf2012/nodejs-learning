var express = require('express'),
    sio = require('socket.io'),
    request = require('superagent');


app = express.createServer(express.bodyParser(), express.static('public'));

app.listen(3000);

var io = sio.listen(app),
    apikey = '{your api key}',
    currentSong,
    dj;

function elect(socket) {
    dj = socket;
    io.sickets.emit('announcement', socket.nickname + ' is the new dj');
    socket.emit('elected');
    socket.dj = true;
    socket.on('disconnect', function () {
        dj = null;
        io.sockets.emit('announcement', 'the dj left - next one to join becomes dj');
    });
};

io.sockets.on('connection', function (socket) {
    console.log('someone connected');

    socket.on('join', function (name) {
        socket.nickname = name;
        socket.broadcast.emit('announcement', name + ' joined the chat');
        if (!dj) {
            elect(socket);
        } else {
            socket.emit('song', currentSong);
        }
    });

    socket.on('text', function(msg, fn) {
        socket.broadcast.emit('text', socket.nickname, msg);
        fn(Date.now());
    });

    socket.on('search', function () {
        
    });
});



