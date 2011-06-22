var mongo = require('backend/services').mongo,
    _ = require('underscore');

var ORM = function () {
    this.types = {};
};

_.extend(ORM.prototype, {
    registerType: function (name, schema) {
        var model = mongo.model(name, new mongo.Schema(schema));
        this.types[name] = model;
        return model;
    },

    getType: function (name) {
        return this.types[name];
    }
});

module.exports = new ORM();
