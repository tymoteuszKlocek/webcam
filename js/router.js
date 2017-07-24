define([
    'marionette',
    'radio',
    'app/appView'
], function (Mn, Ardio, AppView) {
    'use strict';

    var renderChannel = Backbone.Radio.channel('renderView');
    return Mn.AppRouter.extend({
        routes: {
            'localisation': 'showLocalisation',
            'gallery/:title': 'showGallery',
            'list': 'showList',
            'finder': 'showFinder'
        },
        showLocalisation: function () {
            renderChannel.trigger('show:location');
        },
        showList: function () {
            renderChannel.trigger('show:list');
        },
        showGallery: function (title) {
            renderChannel.trigger('show:gallery', title);
        },
        showFinder: function () {
            renderChannel.trigger('show:finder');
        }
    });
});