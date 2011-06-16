var _ = require('underscore');

var Util = function () {
};

_.extend(Util.prototype, {
    respondJSON: function (res, obj, code) {
        code = code || 200;
        res.writeHead(code, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(obj), 'UTF-8');
    },

    respondForbidden: function (res) {
        var obj = { message: "Access denied!" };
        this.respondJSON(res, obj, 403);
    },

    respondBadRequest: function (res) {
        var obj = { message: "Bad request!" };
        this.respondJSON(res, obj, 400);
    }
});

module.exports = new Util();
