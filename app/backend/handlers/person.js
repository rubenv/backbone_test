var MongoHandler = require('backend/handler-mongo');

function personAcl() {
    return true;
}

MongoHandler.create({
    _collection: 'person',

    _schema: {
        name: String,
        address: {
            nr: Number,
            street: String
        }
    },

    _acls: {
        getObject: personAcl,
        getCollection: personAcl,
        newObject: personAcl,
        updateObject: personAcl,
        deleteObject: personAcl
    }
});
