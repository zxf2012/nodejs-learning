var http = require('http');
var serv = http.createServer(function (req, res) {
	console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'image/png'});
    // var stream = require('fs').createReadStream('image.png');
    // stream.on('data', function (data) {
    // 	res.write(data);
    // });
    // stream.on('end', function () {
    // 	res.end();
    // });
	require('fs').createReadStream('image.png').pipe(res);
});
serv.listen(3000);