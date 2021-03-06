/*
* Search function
*
* @param {String} Search query
* @param {Function} callback
* @api public
* */
var request = require('superagent');
module.exports = function search (query, fn) {
    request.get('http://search.twitter.com/search.json')
        .send({q: query})
        .end(function (res) {
            if (res.body && Array.isArray((res.body.results))) {
                return fn(null, res.body.results);
            } else {
                fn(new Error('Bad twitter response'));
            }
        });
}



