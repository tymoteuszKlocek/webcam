define([
    'backbone',
    'marionette',
    'text!app/common/webcam/webcam.View.html',
    'app/common/webcam/webcam.Model',
    'app/common/webcam/webcam.Collection',
    'app/common/info/info.View',
    'app/dashboard/dashboard.View'
], function (Bb, Mn, tpl, Model, WebcamCol, Info, GalleryList) {
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

        childViewEvents: {
            'save:webcam3': 'onSaveWebcam'
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
            this.showChildView('dashboard', new GalleryList({opt: 'mini'}));
        },

        deleteModel: function () {
            var self = this;

            this.model.destroy().then(function (resp) {
                self.detachChildView('dashboard');
                if (resp.error) {
                    self.showChildView('dashboard', new Info({ text: resp.error }));
                }
                if (resp.success === true) {
                    self.triggerMethod('delete', self);
                }
            });
        },

        hideView: function () {
            this.triggerMethod('hide', this);
        },

        onSaveWebcam: function (collectionID) {
            var self = this;
            this.model.set('collectionID', collectionID);
            this.model.save().then(function (resp) {
                self.detachChildView('dashboard');
                if (resp.success === true) {
                    self.showChildView('dashboard', new Info({ text: 'Webcam saved!' }));
                } else {
                    self.showChildView('dashboard', new Info({ text: resp.error }));
                }
            });
        }

    });
});