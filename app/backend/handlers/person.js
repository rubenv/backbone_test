var _ = require('underscore'),
    mongo = require('backend/services').mongo,
    MongoHandler = require('backend/handler-mongo');

var PersonHandler = function () {
};

function personAcl () {
    return true;
}

_.extend(PersonHandler.prototype, MongoHandler.prototype, {
    _collection: 'person',

    _schema: new mongo.Schema({
        uuid: String,
        name: String
    }),

    _registerExtraHandlers: function () {
        this.registerAcl('getObject', personAcl);
        this.registerAcl('getCollection', personAcl);
        this.registerAcl('putObject', personAcl);
        this.registerAcl('postObject', personAcl);
    }
});

new PersonHandler().register();
