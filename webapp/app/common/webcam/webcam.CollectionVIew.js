define([
    'marionette',
    'backbone',
    'text!app/common/webcam/webcam.Collection.html',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.View'
], function (Mn, Bb, tpl, WebcamCol, WebcamView) {
    'use strict';

    return Mn.CollectionView.extend({

        collection: WebcamCol,

        template: _.template(tpl),

        tagName: 'ul',

        className: 'media-list',

        childView: WebcamView,

        initialize: function (options) {
            this.type = options.type;
        },

        childViewOptions: function () {
            return {
                type: this.type,
            };
        },

        onChildviewHide: function (view) {
            this.removeChildView(view);
        }

    });
});