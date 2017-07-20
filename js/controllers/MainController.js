define([
    'marionette',
    'radio',
], function (Mn, Radio ) {
    'use strict';

    var renderChannel = Backbone.Radio.channel('renderView');
    return Mn.Object.extend({
        showLocalisation: function () {
            renderChannel.trigger('show:location');
        },
        showList: function () {
            renderChannel.trigger('show:list');
        },
        showGallery: function () {
            renderChannel.trigger('show:gallery');
        },
        showFinder: function () {
            renderChannel.trigger('show:changed');
        }
    });
});