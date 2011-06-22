var _ = require('underscore'),
    connect = require('connect'),
    fs = require('fs'),
    router = require('backend/router');

// Load type information.
fs.readdir(__dirname + '/handlers/', function (err, files) {
    if (err) {
        throw err;
    }
    _.each(files, function (file) {
        if (file[0] !== '.') {
            require(__dirname + '/handlers/' + file);
        }
    });
});


var backend_server = connect(connect.router(router));

module.exports.server = backend_server;
