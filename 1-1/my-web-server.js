var http = require('http');
var serv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>hello world</h1>');
    //throw new Error('���󲻻ᱻ����')
});
serv.listen(3000);