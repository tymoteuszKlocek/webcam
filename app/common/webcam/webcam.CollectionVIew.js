define([
    'marionette',
    'backbone',
    'text!app/common/webcam/webcam.Collection.html',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.View',
    'app/common/webcam/webcam.Model',
], function (Mn, Bb, tpl, WebcamCol, WebcamColView, WebcamModel) {
    'use strict';

    return Mn.CollectionView.extend({
        collection: WebcamCol,
        template: _.template(tpl),
        tagName: 'ul',
        className: 'media-list',
        childView: WebcamColView,
        
        onChildviewSaveModel: function(view) {
            // saved webcame is removed from view (in scanner)
            this.removeChildView(view);
        }
    });
});