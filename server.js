require.paths.unshift(__dirname + '/app');

var connect = require('connect'),
    fs = require('fs'),
    ugly = require('uglify-js'),
    backend = require('backend');

var templates = {};

function optimize_js(data) {
    var ast = ugly.parser.parse(data),
        pro = ugly.uglify;
    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);
    return pro.gen_code(ast);
}

var server = connect(
    connect.favicon(), 
    connect.profiler(),
    connect.logger(),
    connect.static(__dirname + '/public'),
    connect.bodyParser()
);

server.use('/views', connect.static(__dirname + '/app/backend/views'));
server.use('/', backend.server);
server.listen(3000);
