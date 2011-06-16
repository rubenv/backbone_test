require.paths.unshift(__dirname + '/app');

var connect = require('connect'),
    fs = require('fs'),
    Haml = require('haml'),
    ugly = require('uglify-js'),
    backend = require('backend');

var templates = {};

function load_haml(name, callback) {
    if (templates[name]) {
        callback(templates[name]);
        return;
    }

    fs.readFile(__dirname + '/app/views/' + name + '.haml', 'utf-8', function (err, data) {
        if (err) throw err;
        var template = new Haml(data);
        templates[name] = template;
        callback(template);
    });
}

function load_haml_sync(name) {
    if (templates[name]) {
        return templates[name];
    }

    var data = fs.readFileSync(__dirname + '/app/views/' + name + '.haml', 'utf-8');
    var template = new Haml(data);
    templates[name] = template;
    return template;
}

function optimize_js(data) {
    var ast = ugly.parser.parse(data),
        pro = ugly.uglify;
    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);
    return pro.gen_code(ast);
}

// Compiles and serves HAML templates on demand.
var haml_server = connect(
    connect.router(function (app) {
        app.get('/', function (req, res) {
            res.end('You need to specify a view!');
        });

        app.get('/:view', function (req, res) {
            var view = req.params.view;

            load_haml(view, function (template) {
                res.end(optimize_js(template.toString()));
            });
        });
    })
);

function haml_template(name) {
    var haml = optimize_js(load_haml_sync(name).toString());
    haml = haml.replace(/\\/g, "\\\\")
               .replace(/\'/g, "\\'");
    return 'create_view(\'' + name + '\', \'' + haml + '\');';
}

var app_server = connect(
    connect.router(function (app) {
        app.get('/', function (req, res) {
            load_haml('index', function (template) {
                res.end(template({ haml_template: haml_template }));
            });
        });
    })
);

var server = connect(
    connect.favicon(), 
    connect.profiler(),
    connect.logger(),
    connect.static(__dirname + '/public'),
    connect.bodyParser()
);

server.use('/backend', backend.server);
server.use('/view', haml_server);
server.use('/', app_server);
server.listen(3000);
