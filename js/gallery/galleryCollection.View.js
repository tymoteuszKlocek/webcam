define([
    'marionette',
    'text!gallery/galleryItem.html',
    'gallery/gallery.Collection',
], function (Mn, tpl, Collection) {
    'use strict';

    var renderChannel = Backbone.Radio.channel('renderView');
    return Mn.View.extend({
        //collection: collection,
        template: _.template(tpl)
    });
});