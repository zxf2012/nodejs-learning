var express = require('express'),
	mongodb = require('mongodb');

var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'my secret'}));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('index', {authenticated: false});
})

app.get('/login', function (req, res) {
	res.render('login', {authenticated: false});
})

app.get('/signup', function (req, res) {
	res.render('signup', {authenticated: false});
})

app.listen(3000)