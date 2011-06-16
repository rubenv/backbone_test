var _ = require('underscore'),
    mappers = require('backend/mapper'),
    util = require('backend/util'),
    mongo = require('backend/services').mongo,
    uuid = require('node-uuid');

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
        this.registerController('getCollection', this.getMongoCollection);
        this.registerController('putObject', this.putMongoObject);
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

        var wrapper = _.bind(handler, this);
        mapper.register(reqType, this._collection, wrapper);
    },

    _assignUUID: function (instance) {
        instance.uuid = uuid();
    },

    getMongoObject: function (req, res) {
        if (!req.params.uuid) {
            util.respondBadRequest(res);
            return;
        }

        this.model.findOne({ uuid: req.params.uuid }, function (err, obj) {
            if (err) throw err;
            util.respondJSON(res, obj);
        });
    },

    getMongoCollection: function (req, res) {
        this.model.find(function (err, obj) {
            if (err) throw err;
            util.respondJSON(res, obj);
        });
    },

    putMongoObject: function (req, res) {
        var model = mongo.model(this._collection);
        var instance = new model();
        _.extend(instance, req.body);
        this._assignUUID(instance);
        instance.save(function (err) {
            if (err) throw err;
            util.respondJSON(res, instance);
        });
    }
});


module.exports = MongoHandler;
