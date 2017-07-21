/*global define */

define([
    'backbone',
    'marionette',
    'app/appView',
    'router',
    'nav/nav.CollectionView',
    'place-finder/PlaceFinder.View',
    'gallery/gallery.Collection',
    'gallery/galleryCollection.View',
    'location-checker/map.View',
    'list/listCollection.View',
    'dialog/dialog.View'
], function (Backbone, Marionette, AppView, Router, Nav, Finder, GalleryCollection, Gallery, Location, List, Dialog) {
    'use strict';

    var app = new Marionette.Application({
        region: '#app-container',
        onBeforeStart: function () {
            this.appView = new AppView();
            var router = new Router();
            var appView = new AppView();
            appView.showChildView('main', new List());
            this.renderChannel = Backbone.Radio.channel('renderView');
            this.showView(appView);
        },
        onStart: function () {
            var collection = [];
            this.renderChannel.on('create:gallery', function(title) {
                //just for test
                collection = new GalleryCollection(localStorage.getItem(title)) || new GalleryCollection([
                    {
                        title: 'Paris 1',
                        url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                        state: 'some info',
                    },
                    {
                        title: 'Paris 2',
                        url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                        state: 'some info',
                    },
                    {
                        title: 'Paris 3',
                        url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                        state: 'some info',
                    },
                ]);
            });
            this.renderChannel.on('show:gallery', function (appView) {
                //TODO check setRenderer method here with data from Radio
                appView.showChildView('main', new Gallery({collection: collection}));
                app.showView(appView);
            });
            this.renderChannel.on('show:location', function (appView) {
                appView.showChildView('main', new Location());
                app.showView(appView);
            });
            this.renderChannel.on('show:list', function (appView) {
                appView.showChildView('main', new List());
                app.showView(appView);
            });
            this.renderChannel.on('show:dialog', function () {
                console.log('dialog must show' );

                // this.appView.showChildView('dialog', new Dialog());
                // app.showView(this.appView);
            });
            // this.renderChannel.on('hide:dialog', function () {
            //     this.appView.showChildView('dialog', new List());
            //     app.showView(appView);
            // });
        }

    });

    app.on("before:start", function (options) {
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    return window.app = app;
});