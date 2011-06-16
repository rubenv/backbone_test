var acl = require('backend/acl'),
    mappers = require('backend/mapper'),
    util = require('backend/util');

/* The router is the core of the backend.
 *
 * For each request it goes through the following steps:
 *
 *  1) Based on the parameters, figure out the right policies and
 *     controller to use.
 *  2) Perform an ACL check with the ACL policy.
 *  3) Validate the request with the validation policy.
 *  4) Handle the request with the right controller.
 */

function route(reqType) {
    return function (req, res, next) {
        var objType = req.params.type;

        // Check for a controller first, if none is found, jump out
        // of the router and hand control back to connect.
        var controller = mappers.controllers.resolve(reqType, objType);
        if (controller === null) {
            next();
            return;
        }

        // Check if requester has access to this resource.
        var acl = mappers.acls.resolve(reqType, objType);
        if (!acl()) {
            util.respondForbidden(res);
            return;
        }

        // Validate the request
        var validator = mappers.validators.resolve(reqType, objType);
        if (!validator()) {
            util.respondBadRequest(res);
            return;
        }

        // Handle the request
        controller(req, res);
    };
}

module.exports = function (app) {
    app.get('/:type', route('getCollection'));
    app.get('/:type/:id', route('getObject'));
    app.put('/:type', route('putObject'));
};
