/*global define */

define([
    'backbone',
    'marionette',
    'place-finder/views/PlaceFinder.View',
    'nav/views/nav.View'
], function (Backbone, Marionette, PlaceFinder, Nav) {
    'use strict';

    

    var app = new Marionette.Application({
        region: '#main',

        onStart: function () {
            this.showView(new Nav());
        }
    });

    //app.pages = new Nav([
    //    { title: 'Home', name: 'home', active: true },
    //    { title: 'About', name: 'about' },
    //    { title: 'Contact', name: 'contact' }
    //]);
    //var menu = new MenuView({ collection: app.pages });

    //app.input = { url: 'input attack' };

    var placeFinder = new PlaceFinder({ model: { url: 'input attack' } });

    //app.addInitializer(function () {
    //    console.log('app started');
    //    //app.main.show(placeFinder);
    //    //app.footer.show(new Footer());
    //});

    app.on("start", function (options) {
        placeFinder.addRegions({
            main: {
                el: '#main',
                replaceElement: true
            }
        });
        console.log(placeFinder);
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    //app.vent.on('menu:activate', function (activePageModel) {
    //    menu.collection.findWhere({ active: true })
    //        .set('active', false);
    //    activePageModel.set('active', true);
    //    menu.render();
    //});

    

    return window.app = app;
});