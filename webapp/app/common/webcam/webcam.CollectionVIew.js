define([
    'marionette',
    'backbone',
    'text!app/common/webcam/webcam.Collection.html',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.View',
    'app/common/webcam/webcam.Model',
], function (Mn, Bb, tpl, WebcamCol, WebcamColView, WebcamModel) {
    'use strict';

    var type;
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
        onChildviewSaveModel: function (view) {
            
            // saved webcame is removed from view (in scanner)
            this.removeChildView(view);
        }

    });
});