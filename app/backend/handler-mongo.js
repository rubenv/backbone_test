var _ = require('underscore'),
    mappers = require('backend/mapper'),
    util = require('backend/util'),
    mongo = require('backend/services').mongo;

var MongoHandler = function () {
};

_.extend(MongoHandler.prototype, {
    // Should be set by subclasses.
    _collection: '',
    _schema: null,

    _registerExtraHandlers: function () {
        // Can be overriden by child.
    },

    register: function () {
        if (this._collection === '') {
            throw('_collection can not be empty!');
        }
        if (this._schema === null) {
            throw('_schema can not be empty!');
        }

        this.model = mongo.model(this._collection, this._schema);
        this.registerController('getObject', this.getMongoObject);
        this._registerExtraHandlers();
    },

    registerAcl: function (reqType, handler) {
        this._registerInto(mappers.acls, reqType, handler);
    },

    registerController: function (reqType, handler) {
        this._registerInto(mappers.controllers, reqType, handler);
    },

    _registerInto: function (mapper, reqType, handler) {
        if (handler === null) {
            return;
        }

        mapper.register(reqType, this._collection, handler);
    },

    getMongoObject: function (req, res) {
        if (!req.params.id) {
            util.respondBadRequest(res);
            return;
        }

        console.log(this._schema);
        console.log(this.model);
        this.model.findOne({ id: req.params.id }, function (err, obj) {
            console.log(err);
            console.log(obj);
            util.respondJSON(res, obj);
        });
    }
});


module.exports = MongoHandler;
