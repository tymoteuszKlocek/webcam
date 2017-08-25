define([
    'marionette',
    'backbone',
    'text!app/webcam-collections-dashboard/webcam-collections-list/list.CollectionView.html',
    'app/webcam-collections-dashboard/webcam-collections-list/list.Collection',
    'app/webcam-collections-dashboard/webcam-collections-list/list.View'
], function (Mn, Bb, tpl, ListCol, ListView) {
    'use strict';
    
    var arr = [{title: 1}, {title: 2}]
    return Mn.CollectionView.extend({

        collection: ListCol,

        template: _.template(tpl),

        tagName: 'ul',

        className: 'media-list',

        childView: ListView,

        onRender: function() {
            console.log('collection list rendred')

        }
    
    });
});