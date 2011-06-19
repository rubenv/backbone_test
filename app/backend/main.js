var fs = require('fs'),
    jade = require('jade');

var html = fs.readFileSync(__dirname + '/views/index.jade');

module.exports = function (req, res) {
    res.end(jade.render(html), 'UTF-8');
};
