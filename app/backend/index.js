var connect = require('connect'),
    router = require('backend/router');

var backend_server = connect(
    connect.router(router)
);

module.exports.server = backend_server;
