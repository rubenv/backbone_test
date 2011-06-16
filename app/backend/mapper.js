var _ = require('underscore');

/* The mapper is used to resolve ACL policies, validation policies
 * and controllers for each request.
 *
 * This makes it possible to define custom policies for certain
 * types. If no custom policy is found, the default behavior is
 * used.
 */

var Mapper = function (defaultHandler) {
    this._handlers = {};
    this._default = defaultHandler;
};

_.extend(Mapper.prototype, {
    // Register a new handler
    register: function (reqType, objType, handler) {
        if (!this._handlers[reqType]) {
            this._handlers[reqType] = {};
        }
        this._handlers[reqType][objType] = handler;
    },

    // Resolve a handler
    resolve: function (reqType, objType) {
        if (!this._handlers[reqType] || !this._handlers[reqType][objType]) {
            return this._default; 
        }

        return this._handlers[reqType][objType];
    }
});

// Access denied by default
var defaultAcl = function () {
    return false;
};

// No special validator by default
var defaultValidator = function () {
    return true;
};
 
// Default controller does pass-through through middleware stack (eventually causing 404)
// When null is encountered as a controller, the ACL check is also bypassed.
var defaultController = null;

module.exports = {
    acls: new Mapper(defaultAcl),
    validators: new Mapper(defaultValidator),
    controllers: new Mapper(defaultController)
};
