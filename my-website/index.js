var connect = require('connect');
var server = connect.createServer();
server.use(connect.static(__dirname + '/website'));
server.listen(3000);

server.use(function (req, res, next) {
    console.error( '%s %s ', req.method, req.url);
    next();
});

server.use(function (req, res, next) {
    if ('GET' == req.method && '/images' == req.url.substr(0, 7)) {
        // 托管图片
    } else {
        // 交给其他的中间件
        next();
    }
});

server.use(function (req, res, next) {
    //
    res.writeHead(404);
    res.end('Not Found');
});

