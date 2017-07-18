define([
    'marionette',
    'radio',
    'app',
    'nav/views/nav.View',
    'nav/collections/nav.Collection',
    'nav/views/nav.CollectionView',
    'place-finder/models/PlaceFinder.Model',
    'place-finder/views/PlaceFinder.View',
    'list/views/item.View',
    'list/collections/item.Collection',
    'list/views/itemCollection.View',
    'location-checker/views/map.View',
    'page/views/pageView'
], function (Mn,Radio, App, Nav, NavCollection, NavCollectionView, PlaceFinderModel, PlaceFinderView, List, ListCollection, ListCollectionView, MapView, PageView) {
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
            var placeFinderView = new PlaceFinderView({ model: new PlaceFinderModel() });

            this.regionManager.mainRegion.show(placeFinderView);
            this.showPage();
        },
        showList: function () {
            
            var placeChannel = Backbone.Radio.channel('place');//should be global?
            console.log('showlist', placeChannel);
            placeChannel.on('place:detected', function (data) {
                console.log('ok', data);
            });
            var list = new List();
            var listCollection = new ListCollection([
                {
                    title: 'Gallery 1',
                    url: 'http://www.visages-trekking.com/sites/default/files/styles/flex_produit_custom_user_medium_1x/public/imagesVoyages/dunes_merzouga.jpg?itok=Kz0z_Wbu',
                    active: true
                },
                {
                    title: 'Galerry2',
                    url: 'https://s-media-cache-ak0.pinimg.com/originals/6e/74/dc/6e74dc970931b5f355b7ccf992e0de29.jpg',
                },
                {
                    title: 'Gallery3',
                    url: 'https://media.mnn.com/assets/images/2015/08/forest-waterfall-thailand.jpg.838x0_q80.jpg'
                }
            ]);
            var listView = new ListCollectionView(listCollection);

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
});