define([
    'marionette',
    'radio',
    'app/appView'
], function (Mn, Ardio, AppView) {
    'use strict';

    var renderChannel = Backbone.Radio.channel('renderView');
    var appView = new AppView();
    return Mn.AppRouter.extend({
        routes: {
            'localisation': 'showLocalisation',
            'gallery/:id': 'showGallery',
            'list': 'showList',
        },
        showLocalisation: function () {
            renderChannel.trigger('show:location', appView);
        },
        showList: function () {
            renderChannel.trigger('show:list', appView);
        },
        showGallery: function (id) {
            renderChannel.trigger('create:gallery', id);
            renderChannel.trigger('show:gallery', appView);

        }
    });
});