define([
    'backbone',
    'marionette',
    'text!app/common/webcam/webcam.View.html',
    'app/common/webcam/webcam.Model',
    'app/common/webcam/webcam.Collection',
], function (Bb, Mn, tpl, Model, WebcamCol) {
    'use strict';

    return Mn.View.extend({

        template: _.template(tpl),

        tagname: 'li',

        className: 'media',

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
            this.model.save();
            //this.collection.add(this.model);
            //this.collection.create(this.model);
            //console.log(this.collection)
        },

    })
})