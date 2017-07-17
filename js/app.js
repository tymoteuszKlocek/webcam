/*global define */

define([
    'backbone',
    'marionette',
    'place-finder/views/PlaceFinder.View',
    'nav/views/nav.View',
    'nav/collections/nav.Collection',
    'nav/views/nav.CollectionView',
    'page/views/pageView',
    'routers/index'
], function (
    Backbone,
    Marionette,
    PlaceFinder,
    Nav,
    NavCollection,
    NavCollectionView,
    PageView,
    Router) {
        'use strict';

        var app = new Marionette.Application({
            region: '#app-container',

            onStart: function () {
                var pageView = new PageView();
                pageView.addRegions({
                    nav: {
                        el: '#nav',
                        replaceElement: true
                    },
                    main: {
                        el: '#main',
                        replaceElement: true
                    },
                    dialog: '#dialog'
                });
                var placeFinder = new PlaceFinder();
                var nav = new Nav();
                var navCollection = new NavCollection();
                var navCollectionView = new NavCollectionView();
                var mainRegion = pageView.getRegion('main');
                var navRegion = pageView.getRegion('nav');
                var dialogRegion = pageView.getRegion('dialog');
                mainRegion.show(placeFinder);
                navRegion.show(navCollectionView);
                this.showView(pageView);
                var router = new Router();
            }
        });

        app.on("before:start", function (options) {

            if (Backbone.history) {
                Backbone.history.start();
            }
        });

        return window.app = app;
    });