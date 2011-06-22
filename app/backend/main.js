var fs = require('fs'),
    jade = require('jade'),
    orm = require('backend/orm');

var html = fs.readFileSync(__dirname + '/views/index.jade');

module.exports = function (req, res) {
    var people = orm.getType('person').find(function (err, obj) {
        if (err)
            throw err;
        res.end(jade.render(html, { locals: { people: obj } }), 'UTF-8');
    });
};
