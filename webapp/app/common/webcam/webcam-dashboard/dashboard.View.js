define([
    'marionette',
    'backbone',
    'text!app/common/webcam/webcam-dashboard/dashboard.View.html',
    'app/common/webcam/webcam-collections-dashboard/dashbord.View'
], function (Mn, Bb, tpl, WebcamCollectionDashboard) {
    'use strict';

    return Mn.View.extend({

        template: _.template(tpl),

        regions: {
            dashboard: '#collection-dashborad'
        },

        onRender: function () {
            this.showChildView('dashboard', new WebcamCollectionDashboard());
        },

        onChildviewSetCollectionID: function (collectionID) {
            this.triggerMethod('set:collectionID', collectionID);
        }

    })
});