define([
    'marionette',
    'backbone',
    'text!app/common/webcam/webcam.Collection.html',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.View'
], function (Mn, Bb, tpl, WebcamCol, WebcamColView) {
    'use strict';

    return Mn.CollectionView.extend({

        collection: WebcamCol,

        template: _.template(tpl),

        tagName: 'ul',

        className: 'media-list',

        childView: WebcamColView,

        initialize: function (options) {
            this.type = options.type;
        },

        childViewOptions: function (model) {
            return {
                type: this.type,
            }
        },

        // onChildviewSaveModel: function (view) {
        //     this.removeChildView(view);
        // }

    });
});