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

var list;

function run() {
    var person = new People();

    list = new PeopleList({
        collection: person
    });

    person.fetch();
}

var Person = Backbone.Model.extend({
    
});

var People = Backbone.Collection.extend({
    url: '/backend/person',
    model: Person
});

var PeopleList = Backbone.View.extend({
    render: function () {
        console.log(this);
    }
});

$(run);
