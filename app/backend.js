var connect = require('connect');

function getCollection(req, res, next) {
    var ret = {
        type: req.params.collection,
        count: 0,
        items: []
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ret), 'UTF-8');
}

function getObject(req, res, next) {
    var ret = {
        id: req.params.id
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ret), 'UTF-8');
}

var backend_server = connect(
    connect.router(function (app) {
        app.get('/:collection', getCollection);
        app.get('/:collection/:id', getObject);
    })
);

exports.server = backend_server;
