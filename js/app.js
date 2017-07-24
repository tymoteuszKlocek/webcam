/*global define */

define([
    'backbone',
    'marionette',
    'app/appView',
    'router',
    'nav/nav.CollectionView',
    'place-finder/PlaceFinder.View',
    'gallery/gallery.Collection',
    'gallery/gallery.CollectionView',
    'location-checker/map.View',
    'list/list.CollectionView',
    'dialog/dialog.View'
], function (Bb, Mn, AppView, Router, Nav, Finder, GalleryCollection, Gallery, Location, ListCollectionView, Dialog) {
    'use strict';

    var app = new Mn.Application({
        region: '#app-container',
        onBeforeStart: function () {
            this.appView = new AppView();
            this.router = new Router();
            this.renderChannel = Bb.Radio.channel('renderView');
            this.appView.showChildView('main', new Finder());
            this.showView(this.appView);
        },
        onStart: function () {
            var collection = new GalleryCollection([
                   //
                ]);
            this.renderChannel.on('create:gallery', function (title) {
                //just for test
                console.log(title);
                collection = new GalleryCollection(localStorage.getItem(title)) 
            });
            this.renderChannel.on('show:gallery', function (title) {
                //TODO check setRenderer method here with data from Radio
                console.log(title);
                app.appView.showChildView('main', new Gallery());
                app.showView(app.appView);
            });
            this.renderChannel.on('show:location', function () {
                app.appView.showChildView('main', new Location());
                app.showView(app.appView);
            });
            this.renderChannel.on('show:list', function () {
                app.appView.showChildView('main', new ListCollectionView());
                app.showView(app.appView);
            });
            this.renderChannel.on('show:finder', function () {
                app.appView.showChildView('main', new Finder());
                app.showView(app.appView);
            });
            this.renderChannel.on('show:dialog', function () {
                app.appView.showChildView('main', new Dialog());
                app.showView(app.appView);
            });
        },
        

    });

    app.on("before:start", function (options) {
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    return window.app = app;
});