var express = require('express'),
	mongodb = require('mongodb');

var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'my secret'}));

// 身份验证中间件
app.use(function (req, res, next) {
	if (req.session.loggedIn) {
		res.local('authenticated', true);
		app.users.findOne({_id: {$oid: req.session.loggedIn}}, function (err, doc) {
			if (err) return next(err);
			res.local('me', doc);
			next();
		})
	} else {
		res.local('authenticated', false);
		next();
	}
})

app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('index');
})

app.get('/login/:signupEmail', function (req, res) {
	res.render('login', {signupEmail: req.params.signupEmail});
})

app.post('/login', function (req, res) {
	app.users.findOne({email: req.body.user.email, password: req.body.user.password}, function (err, doc) {
		if (err) throw err;
		if (!doc) return res.send('<p>User not found, Go back and try again</p>');
		req.session.loggedIn = doc._id.toString();
		res.redirect('/');
	});
})

app.get('/signup', function (req, res) {
	res.render('signup');
})

app.post('/signup', function (req, res) {
	res.render('signup', {authenticated: false});
	app.users.insert(req.body.user, function (err, doc) {
		if (err) return next(err);
		res.redirect('login/' + doc[0].email);
	})
})

app.get('/logout', function (req, res) {
	req.session.loggedIn = null;
	res.redirect('/');
})

var server = new mongodb.Server('127.0.0.1', 27017);
new mongodb.Db('my-website', server).open(function (err, client) {
	if (err) throw err;
	console.log('\033[96m + \033[39m connectd to mongodb');
	app.users = new mongodb.Collection(client, 'users');
	client.ensureIndex('uers', 'email', function (err) {
		if (err) throw err;
		client.ensureIndex('users', 'password', function (err) {
			if (err) throw err;
			console.log('\033[96m + \033[39m ensured indexes');
			app.listen(3000, function () {
				console.log('\033[96m + \033[39m app listening on *:3000');
			});
		})
	})
})

