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
    'page/views/pageView',
    'webcam/views/webcam.View',
    'webcam/models/webcam.Model'
], function (Mn,Radio, App, Nav, NavCollection, NavCollectionView, PlaceFinderModel, PlaceFinderView, List, ListCollection, ListCollectionView, MapView, PageView,  WebcamView, WebcamModel) {
    'use strict';

    return Mn.Object.extend({

        initialize: function () {
            var newItemChannel = Backbone.Radio.channel('newItem');
            newItemChannel.on('newItem:added', function(){
                console.log('change detected');
                this.showList();
            })
            this.pageView = new PageView();
            this.pageView.addRegions({
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
            });
            this.region = this.pageView.getRegions();
            // this.region.main = this.pageView.getRegion('main');
            // this.region.finder = this.pageView.getRegion('finder');
            // this.region.nav = this.pageView.getRegion('nav');
            // this.region.dialog = this.pageView.getRegion('dialog');
        },
        showLocalisation: function () {
            //TODO
            var mapView = new MapView();
            this.region.main.show(mapView);
            this.showPage();
        },
        showList: function () {
            var list = new List();
            var collection = JSON.parse(localStorage.getItem("collection")) || [];
            var listCollection = new ListCollection(collection);
            var listView = new ListCollectionView({collection: listCollection});
            this.region.main.show(listView);
            this.showPage();
        },
        showFinder: function () {
            var placeFinderView = new PlaceFinderView({ model: new PlaceFinderModel() });
            // below some code to add childView, it doesn't work yet, why?
            // placeFinderView.addRegions({
            //     webcam: '#webcam'
            // });
            // var webcamRegion = placeFinderView.getRegion('webcam');
            // var webcamModel = new WebcamModel();
            // var webcamView = new WebcamView(webcamModel);
            // console.log('1finderview webcamRegion', webcamRegion);
            // webcamRegion.show(webcamView);
            // console.log('finderview webcamRegion', webcamRegion);
            this.region.finder.show(placeFinderView);
        },
        showNav: function() {
            var nav = new Nav();
            var navCollection = new NavCollection();
            var navCollectionView = new NavCollectionView();
            this.region.nav.show(navCollectionView);
        },
        showPage: function () {
            this.showNav();
            this.showFinder();
            app.showView(this.pageView);
        }
    });
});