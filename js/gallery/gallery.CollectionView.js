define([
    'marionette',
    'text!gallery/galleryItem.html',
    'gallery/gallery.Collection',
    'gallery/galleryItem.View'
], function (Mn, tpl, Collection, GalleryItem) {
    'use strict';

    var collection = new Collection([
        {
            title: 'Paris 1',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            country: 'some info',
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
        {
            title: 'Paris 4',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            state: 'some info',
        },
        {
            title: 'Paris 5',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            state: 'some info',
        },
    ]);

    return Mn.CollectionView.extend({
        collection: collection,
        template: _.template(tpl),
        className: 'panel',
        childView: GalleryItem
    });
});