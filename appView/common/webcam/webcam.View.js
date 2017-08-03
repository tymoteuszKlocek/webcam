define([
    'backbone',
    'marionette',
    'text!appView/common/webcam/webcam.View.html',
    'appView/common/webcam/webcam.Model',
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
            this.model.set('state', item.model.attributes.state);
            
            if (this.model.get('state') === 'scanner') {
                this.ui.listBtns.addClass('hide');
            }
            if (this.model.get('state') === 'list') {
                this.ui.scannerBtns.addClass('hide');
            }
        },

        deleteModel: function () {
            this.model.destroy();
        },

        saveModel: function () {
            this.model.save();
        },
        
    })
})