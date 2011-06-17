var MongoHandler = require('backend/handler-mongo');

function personAcl () {
    return true;
}

MongoHandler.create({
    _collection: 'person',

    _schema: {
        name: String
    },

    _acls: {
        getObject: personAcl,
        getCollection: personAcl,
        putObject: personAcl,
        postObject: personAcl,
        deleteObject: personAcl
    }
});
