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
            scannerBtns: '#btn-scanner',
            listBtns: '#btn-list'
        },
        events: {
            'change:state': 'render',
            'click @ui.delete': 'deleteModel',
            'click @ui.save': 'saveModel'
        },
        onRender: function (options) {
            //this looks very bad but works...
            console.log(this.options);
            var self = this;
            webcamChannel.on('change:state', function (state) {
                if (state === 'scanner') {
                    self.ui.listBtns.addClass('hide');
                }
                if (state === 'list') {
                    self.ui.scannerBtns.addClass('hide');
                }
                
            });
            this.ui.listBtns.addClass('hide');
        },
        deleteModel: function () {
            this.model.destroy();
        },
        saveModel: function () {
            this.model.save();
        }
    })
})