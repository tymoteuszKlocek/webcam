define([
    'marionette',
    'backbone',
    'text!app/common/lists/gallery/list.View.html',
    'app/common/gallery/gallery.CollectionView',
    'app/common/gallery/gallery.Collection',
], function (Mn, Bb, tpl, GalleryCollectionView, GalleryCollection) {
    'use strict';

    return Mn.View.extend({

        template: _.template(tpl),

        regions: {
            list: '.list'
        },

        childViewEvents: {
            'save:webcam1': 'onSaveWebcam'
        },

        initialize: function (opt) {
            var self = this;
            this.collection = new GalleryCollection();
            this.collection.fetch().done(function () {
                self.displayView(opt);
            });
        },

        displayView: function (opt) {
            this.showChildView('list', new GalleryCollectionView({collection: this.collection, opt}));
        },

        onSaveWebcam: function(collectionID) {
            this.triggerMethod('save:webcam2', collectionID);
        }

    });
});