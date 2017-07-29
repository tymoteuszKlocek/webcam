define([
    'backbone',
    'marionette',
    'text!app/appView/common/webcam/webcam.View.html',
    'app/appView/common/webcam/webcam.Model',
], function (Bb, Mn, tpl, Model) {
    'use strict';

    var webcamChannel = Bb.Radio.channel('buttonDisplay');
    return Mn.View.extend({
        template: _.template(tpl),
        tagname: 'li',
        className: 'media',
        ui: {
            save: '#save',
            delete: '#delete',
            deleteFromList: '#deleteFromList',
            scannerBtns: '#btn-scanner',
            listBtns: '#btn-list',
            showOnMap: '#show-on-map'
        },
        events: {
            'change:state': 'render',
            'click @ui.delete': 'deleteModel',
            'click @ui.save': 'saveModel',
            'click @ui.deleteFromList': 'deleteModel',
            'click @ui.showOnMap': 'showOnMap'
        },
        triggers: {
             'click @ui.save': 'save:model',
        },
        onRender: function (item) {
            var state = item.model.attributes.state;
            if (state === 'scanner') {
                this.ui.listBtns.addClass('hide');
            }
            if (state === 'list') {
                this.ui.scannerBtns.addClass('hide');
            }
        },
        deleteModel: function () {
            this.model.destroy();
        },
        saveModel: function () {
            this.model.save();
        },
        showOnMap: function(m) {
            console.log('showOnMap', m)
        }
    })
})