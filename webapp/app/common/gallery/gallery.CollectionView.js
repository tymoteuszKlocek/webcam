define([
    'marionette',
    'backbone',
    'text!app/common/gallery/gallery.CollectionView.html',
    'app/common/gallery/gallery.Collection',
    'app/common/gallery/gallery.View',
], function (Mn, Bb, tpl, GalleryCol, GalleryView) {
    'use strict';

    return Mn.CollectionView.extend({

        childView: GalleryView,

        buildChildView: function (child, ChildViewClass) {
            var options = _.extend({ model: child }, this.type);
            var view = new ChildViewClass(options);
            return view;
        },

        collection: GalleryCol,

        template: _.template(tpl),

        tagName: 'ul',

        className: 'list-group',

        childViewEvents: {
            'remove:item': 'removeItem',
            'save:webcam': 'onSaveWebcam'
        },

        initialize: function (opt) {
            this.type = opt;
            this.filterChannel = Bb.Radio.channel('filter');
        },

        removeItem: function (childView) {
            childView.model.removeItem();
            childView.destroy();
        },

        onSaveWebcam: function (childView) {
            this.triggerMethod('save:webcam1', childView.model.get('id'));
        }

    });
});