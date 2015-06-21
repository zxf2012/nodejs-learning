var net = require('net');
var count = 0,
    users= {};
var server = net.createServer(function (conn) {
    // console.log('\033[90m    new connection!\033[39m');
    conn.setEncoding('utf-8');
    conn.write(
         '\n > welcome to \033[92mnode-chat\033[39m!\n > ' + count + ' other people are connected at this time.\n > please write your name and press enter:'
    );
    count++;
    var nickname;
    conn.on('data', function (data) {
        data = data.replace('\r\n', '');
        //console.log(data);
        if (!nickname) {
            if (users[data]) {
                conn.write('\033[93m> nickname already in use. try again:\033[39m ');
                return;
            } else {
                nickname = data;
                users[nickname] = conn;
                broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n', true);
            }
        } else {
            broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true);

        }
    });
    conn.on('close', function () {
        count--;
        if (nickname) {
            delete users[nickname];
            broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n');
        }
    });

    function broadcast(msg, exceptMyself) {
        for (var i in users) {
            if (!exceptMyself || i != nickname) {
                users[i].write(msg);
            }
        }
    }
});

server.listen(3000, function () {
    console.log('\033[96m    server listening on *:3000\033[39m');
});

