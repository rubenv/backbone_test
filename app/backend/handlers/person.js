var _ = require('underscore'),
    mongo = require('backend/services').mongo,
    MongoHandler = require('backend/handler-mongo');

var PersonHandler = function () {
};

function personAcl () {
    return true;
}

_.extend(PersonHandler.prototype, MongoHandler.prototype, {
    _collection: 'people',

    _schema: new mongo.Schema({
        id: Number,
        name: String
    }),

    _registerExtraHandlers: function () {
        this.registerAcl('getObject', personAcl);
        this.registerAcl('getCollection', personAcl);
    }
});

new PersonHandler().register();
