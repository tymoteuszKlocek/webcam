define([
    'marionette',
    'text!app/app.html',
    'nav/nav.CollectionView',
    'place-finder/PlaceFinder.View'
], function (Mn, tpl, Nav, Finder) {
    'use strict';

    var renderChannel = Backbone.Radio.channel('renderView');

    return Mn.View.extend({
        template: _.template(tpl),
        regions: {
            nav: {
                el: '#nav',
                replaceElement: true
            },
            finder: '#finder',
            main: {
                el: '#main',
                replaceElement: true
            },
            dialog: '#dialog'
        },
        initialize: function () {
            //?
        },
        onRender: function () {
            this.showChildView('nav', new Nav());
            this.showChildView('finder', new Finder());
        }
    });
});