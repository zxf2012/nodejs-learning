var http = require('http'),
	qs = require('querystring');
// function send(theName) {
// 	http.request({
// 		host: '127.0.0.1',
// 		port: '3000',
// 		url: '/',
// 		method: 'POST'
// 	}, function(res) {
// 		res.setEncoding('utf-8');
// 		res.on('end', function () {
// 			console.log('\n \033[90m request complete!\033[39m\n');
// 			process.stdout.write('\n your name:');
// 		});
// 	}).end(qs.stringify({name: theName}));
// };

// process.stdout.write('\n your name:');
// process.stdin.resume();
// process.stdin.setEncoding('utf-8');
// process.stdin.on('data', function (name) {
// 	send(name.replace('\n', ''));
// })

var search = process.argv.slice(2).join(' ').trim();

if(!search) {
	return console.log('\n Usage: node tweet <search term>');
}
console.log('\n searching for: \033[96m' + search + '\033[39m\n');

http.request({
	host: 'search.baidu.com',
	path: '/search.json?' + qs.stringify({q: search})
}, function (res) {
	var body = '';
	res.setEncoding('utf-8');
	res.on('data', function (chunk) {
		body += chunk;
	});
	res.on('end', function () {
		var obj = JSON.parse(body);
		obj.results.forEach(function (tweet) {
			console.log('    \033[90m' + tweet.text + '\033[39m');
			console.log('    \033[94m' + tweet.from_user + '\033[39m');
			console.log('--');
		});
	});
}).end();








