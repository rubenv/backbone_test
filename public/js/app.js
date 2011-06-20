/*
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
*/

var app = window.app = {
    controllers: {},
    model: {},
    data: {},
    widgets: {},
    ui: {}
};

app.model.Person = Backbone.Model.extend({
});

app.model.People = Backbone.Collection.extend({
    url: '/backend/person',
    model: app.model.Person
});

app.widgets.PeopleList = Backbone.View.extend({
    tagName: 'ul',

    constructor: function (options) {
        Backbone.View.call(this, options);
        _.bindAll(this, "render");
        app.data.People.bind("refresh", this.render);
        app.data.People.bind("add", this.render);
        app.data.People.bind("remove", this.render);
    },

    render: function () {
        var el = $(this.el);
        el.empty();
        this.collection.map(function (person) {
            el.append($('<li/>').text(person.get('name')));
        });
        return this;
    }
});

app.widgets.AddLink = Backbone.View.extend({
    tagName: 'a',

    initialize: function() {
        _.bindAll(this, "addPerson");
    },

    events: {
        'click': 'addPerson'
    },

    render: function () {
        var el = $(this.el);
        el.attr('href', '#');
        el.text('Add');
        return this;
    },

    addPerson: function (event) {
        var name = prompt('Name?');
        if (name) {
            app.data.People.create({ name: name });
        }
        event.stopPropagation();
        event.preventDefault();
    }
});

$(function () {
    app.data.People = new app.model.People();

    app.ui.PeopleList = new app.widgets.PeopleList({
        collection: app.data.People
    });
    app.ui.AddLink = new app.widgets.AddLink();

    $('#app').append(app.ui.PeopleList.render().el);
    $('#app').append(app.ui.AddLink.render().el);

    app.data.People.fetch();
});
