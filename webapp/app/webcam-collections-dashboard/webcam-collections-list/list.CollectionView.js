define([
    'marionette',
    'backbone',
    'text!app/webcam-collections-dashboard/webcam-collections-list/list.CollectionView.html',
    'app/webcam-collections-dashboard/webcam-collections-list/list.Collection',
    'app/webcam-collections-dashboard/webcam-collections-list/list.View',
    'app/webcams-list/list.View'
], function (Mn, Bb, tpl, ListCol, ListView, WebcamsListView) {
    'use strict';
  
    return Mn.CollectionView.extend({

        collection: ListCol,

        template: _.template(tpl),

        tagName: 'ul',

        className: 'list-group',

        childView: ListView,

        childViewEvents: {
            'remove:item': 'removeItem',
            'get:collection': 'getCollection'
        },

        initialize: function() {
            this.filterChannel = Bb.Radio.channel('filter');
        },

        removeItem: function(childView) {
            childView.model.removeItem();
            childView.destroy();
        },

        getCollection: function(childView) {
            var self = this;
            childView.model.getCollection(childView).done(function(collection) {
                self.filterChannel.request('filterState', new WebcamsListView(collection));
            });
        }
    
    });
});