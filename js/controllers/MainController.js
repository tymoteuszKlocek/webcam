define([
    'marionette',
    'app',
    'nav/views/nav.View',
    'nav/collections/nav.Collection',
    'nav/views/nav.CollectionView',
    'place-finder/views/PlaceFinder.View',
    'list/views/item.View',
    'list/collections/item.Collection',
    'list/views/itemCollection.View',
    'location-checker/views/map.View',
    'page/views/pageView'
], function (
    Mn,
    App,
    Nav,
    NavCollection,
    NavCollectionView,
    PlaceFinder,
    List,
    ListCollection,
    ListCollectionView,
    MapView,
    PageView) {
    'use strict';

    return Mn.Object.extend({
        initialize: function () {
            this.pageView = new PageView();
            this.pageView.addRegions({
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
            this.regionManager = {};
            this.regionManager.mainRegion = this.pageView.getRegion('main');
            this.regionManager.navRegion = this.pageView.getRegion('nav');
            this.regionManager.dialogRegion = this.pageView.getRegion('dialog');
        },
        showLocalisation: function () {
            //TODO
            var mapView = new MapView();
            this.regionManager.mainRegion.show(mapView);
            this.showPage();
        },
        showFinder: function () {
            var placeFinder = new PlaceFinder();
            this.regionManager.mainRegion.show(placeFinder);
            this.showPage();
        },
        showList: function () {
            var list = new List();
            var listCollection = new ListCollection();
            var listView = new ListCollectionView();
            this.regionManager.mainRegion.show(listView);
            this.showPage();
        },
        showPage: function () {
            var nav = new Nav();
            var navCollection = new NavCollection();
            var navCollectionView = new NavCollectionView();
            this.regionManager.navRegion.show(navCollectionView)
            app.showView(this.pageView);
        }
    });
    //return MainController;
});