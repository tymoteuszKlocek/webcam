define([
    'backbone',
    'marionette',
    'text!app/common/webcam/webcam.View.html',
    'app/common/webcam/webcam.Model',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam-dashboard/dashboard.View'
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamDashboard) {
    'use strict';

    return Mn.View.extend({

        template: _.template(tpl),

        tagname: 'li',

        className: 'media',

        regions: {
            dashboard: {
                el: '#webcam-dashboard',
                replaceElement: true
            },
        },

        ui: {
            save: '#save',
            deleteFromView: '#delete',
            deleteFromList: '#deleteFromList',
            scannerBtns: '#btn-scanner',
            listBtns: '#btn-list',
        },

        events: {
            'click @ui.deleteFromView': 'deleteModel',
            'click @ui.save': 'saveModel',
            'click @ui.deleteFromList': 'deleteModel',
            'click @ui.showOnMap': 'showOnMap'
        },

        triggers: {
            'click @ui.save': 'save:model',
        },

        initialize: function (options) {
            this.type = options.type;
        },

        onRender: function (child) {
            if (child.type === 'scanner') {
                this.ui.listBtns.addClass('hide');
            }
            if (child.type === 'list') {
                this.ui.scannerBtns.addClass('hide');
            }
        },

        deleteModel: function () {
            this.model.destroy(); // is teher better way?

        },

        saveModel: function () {
            this.ui.scannerBtns.addClass('hide');
            this.ui.listBtns.addClass('hide');
            this.showChildView('dashboard', new WebcamDashboard());
        },

        onChildviewSetCollectionID: function (collectionID) {
            this.model.set('collectionID', collectionID);
            this.model.save();
        }

    })
})