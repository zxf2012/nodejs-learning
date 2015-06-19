var http = require('http');
var serv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>hello world</h1>');
    //throw new Error('错误不会被捕获')
});
serv.listen(3000);

process.on('uncatchException', function (err) {
    console.error(err);
    process.exit(1);
});