define([
    'marionette',
    'text!gallery/galleryItem.html',
    'gallery/gallery.Collection',
], function (Mn, tpl, Collection) {
    'use strict';
    var collection = new Collection([
        {
            title: 'Paris 1',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            state: 'some info',
        },
        {
            title: 'Paris 2',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            state: 'some info',
        },
        {
            title: 'Paris 3',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            state: 'some info',
        },
    ])
    return Mn.View.extend({
        collection: collection,
        template: _.template(tpl)
    });
});