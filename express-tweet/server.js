var express = require('express'),
    search = require('./search');
var app = express.createServer();
app.configure('production', function () {
    app.enable('view cache');
});
app.set('view cache', true);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});

console.log(app.set('views'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/search', function (req, res, next) {
    search(req.query.q, function (err, tweets) {
        if (err) return next(err);
        res.render('search', {results: tweets, search: req.query.q});
    });
});

app.error(function (err, req, res, next) {
    if ('Bad twitter response' == err.message) {
        res.render('twitter-error');
    } else {
        next();
    }
});

app.error(function (err, req, res) {
    res.render('error', {status:500});
});

app.listen(3000);