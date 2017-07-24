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
], function (Bb, Mn, AppView, Router, Nav, Finder, GalleryCollection, Gallery, Location, List, Dialog) {
    'use strict';

    var app = new Mn.Application({
        region: '#app-container',
        onBeforeStart: function () {
            this.appView = new AppView();
            var router = new Router();
            //this.appView = new AppView();
            this.renderChannel = Bb.Radio.channel('renderView');
            this.appView.showChildView('main', new Finder());
            this.showView(this.appView);
        },
        onStart: function () {
            var collection = [];
            this.renderChannel.on('create:gallery', function (title) {
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
                    {
                        title: 'Paris 4',
                        url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                        state: 'some info',
                    },
                    {
                        title: 'Paris 5',
                        url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                        state: 'some info',
                    },
                ]);
            });
            this.renderChannel.on('show:gallery', function (title) {
                //TODO check setRenderer method here with data from Radio
                app.appView.showChildView('main', new Gallery({ collection: collection }));
                app.showView(app.appView);
            });
            this.renderChannel.on('show:location', function () {
                app.appView.showChildView('main', new Location());
                app.showView(app.appView);
            });
            this.renderChannel.on('show:list', function () {
                app.appView.showChildView('main', new List());
                app.showView(app.appView);
            });
            this.renderChannel.on('show:finder', function () {
                app.appView.showChildView('main', new Finder());
                app.showView(app.appView);
            });
            this.renderChannel.on('show:dialog', function (data) {
                app.appView.showChildView('dialog', new Dialog());
                app.showView(this.appView);
            });
        }

    });

    app.on("before:start", function (options) {
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    return window.app = app;
});