var views = {};

function create_view(name, data) {
    var wrapper = 'return anonymous(params);',
        template = new Function("params", data+wrapper);

    views[name] = template;
    return template;
}

function render_view(div, name, params) {
    var render = function (template) {
        $(div).html(template(params));
    };

    if (views[name]) {
        render(views[name]);
        return;
    }

    $.ajax('/view/' + name, {
        success: function (data) {
            var template = create_view(name, data);
            render(template);
        }
    });
}

function run() {
    render_view('body', 'test', {
        people: [
            { name: 'Ruben' },
            { name: 'Tinne' }
        ]
    });
}

$(run);
