(function(){

    var HamlEngine = exports,
        _ = require("underscore")._,
        Haml = require('haml'),
        fs = require('fs');

    HamlEngine.Template = function(name) {
        this.filename = __dirname + '/views/' + name + '.haml';
        this.parse();
    };

    _.extend(HamlEngine.Template.prototype, {
        parse: function() {
            var data = fs.readFileSync(this.filename),
                compiled = Haml.compile(data.toString());
            this.template = Haml.optimize(compiled);
        }
    });
})();
