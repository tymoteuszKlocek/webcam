define([
    'marionette',
    'backbone',
    'text!app/appView/common/webcam/webcam.Collection.html',
    'app/appView/common/webcam/webcam.Collection',
    'app/appView/common/webcam/webcam.View',
    'app/appView/common/webcam/webcam.Model',
], function (Mn, Bb, tpl, WebcamCol, WebcamColView, WebcamModel) {
    'use strict';

    return Mn.CollectionView.extend({
        collection: WebcamCol,
        template: _.template(tpl),
        tagName: 'ul',
        className: 'media-list',
        childView: WebcamColView,
    });
});