var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/backbone_test');

module.exports = {
    mongo: mongoose
};
