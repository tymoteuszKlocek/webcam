define([
    'marionette',
    'text!app/app.html',
    'nav/nav.CollectionView',
    'place-finder/PlaceFinder.View',
    'gallery/galleryCollection.View',
    'location-checker/map.View',
    'webcam/webcam.View',
    'list/listCollection.View',
], function (Mn, tpl, Nav, Finder, Gallery, Location, Webcam, List) {
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
            renderChannel.on('show:gallery', function () {
                console.log('gallery');
                this.showChildView('main', new Gallery());
            });
            renderChannel.on('show:location', function () {
                console.log('location');
                this.showChildView('main', new Location());
            });
            renderChannel.on('show:list', function () {
                console.log('list');
                this.showChildView('main', new List());
            });
        },
        onRender: function () {
            this.showChildView('nav', new Nav());
            this.showChildView('finder', new Finder());
            this.showChildView('main', new Gallery());
        },
        onShow: function () {
            
        }
    });
});