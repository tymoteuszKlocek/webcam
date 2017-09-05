define([
    'marionette',
    'backbone',
    'text!app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.CollectionView.html',
    'app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.Collection',
    'app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.View'
], function (Mn, Bb, tpl, ListCol, ListView) {
    'use strict';
    
    return Mn.CollectionView.extend({

        collection: ListCol,

        template: _.template(tpl),

        tagName: 'ul',

        className: 'alert alert-info',

        childView: ListView,

        childViewEvents: {
            'save:collection': 'saveCollection'
        },

        saveCollection: function(childView) {
            var collectionID = childView.model.attributes.id;
            this.triggerMethod('set:collectionID', collectionID);
        }
    
    });
});