define([
    'marionette',
    'backbone',
    'text!appView/common/webcam/webcam.Collection.html',
    'appView/common/webcam/webcam.Collection',
    'appView/common/webcam/webcam.View',
    'appView/common/webcam/webcam.Model',
], function (Mn, Bb, tpl, WebcamCol, WebcamColView, WebcamModel) {
    'use strict';

    return Mn.CollectionView.extend({
        collection: WebcamCol,
        template: _.template(tpl),
        tagName: 'ul',
        className: 'media-list',
        childView: WebcamColView,
        
        onChildviewSaveModel: function(view) {
            this.removeChildView(view);
        }
    });
});