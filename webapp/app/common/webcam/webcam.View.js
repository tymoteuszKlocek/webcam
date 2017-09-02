define([
    'backbone',
    'marionette',
    'text!app/common/webcam/webcam.View.html',
    'app/common/webcam/webcam.Model',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam-dashboard/dashboard.View',
    'app/common/info/info.View'
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamDashboard, Info) {
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
            hide: '#hide',
            delete: '#delete',
            scannerBtns: '#btn-scanner',
            listBtns: '#btn-list',
        },

        events: {
            'click @ui.hide': 'hideView',
            'click @ui.save': 'saveModel',
            'click @ui.delete': 'deleteModel',
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

        saveModel: function () {
            this.ui.scannerBtns.addClass('hide');
            this.ui.listBtns.addClass('hide');
            this.showChildView('dashboard', new WebcamDashboard());
        },
        
        deleteModel: function () {
            var self = this;

            this.model.destroy().then(function(resp) {
                self.detachChildView('dashboard');
                if (resp.error) {
                    self.showChildView('dashboard', new Info({ text: resp.error }));
                }
                if (resp.success === true) {
                    self.showChildView('dashboard', new Info({ text: resp.msg }));
                }
            });
        },

        hideView: function () {     
           this.triggerMethod('hide', this);
        },

        onChildviewSetCollectionID: function (collectionID) {
            var self = this;

            this.model.set('collectionID', collectionID);
            this.model.save().then(function (resp) {
                self.detachChildView('dashboard');
                if (resp.success === true) {
                    self.showChildView('dashboard', new Info({ text: "Webcam saved!" }));
                } else {
                    self.showChildView('dashboard', new Info({ text: resp.error + "You have already added the webcam to this collection." }));
                }
            });
        }

    })
})