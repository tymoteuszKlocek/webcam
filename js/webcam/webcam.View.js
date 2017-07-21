define([
    'marionette',
    'text!webcam/webcam.html',
    'webcam/webcam.Model'
], function(Mn, tpl, Model) {
    'use strict';
    
    var model = new Model();
    var renderChannel = Backbone.Radio.channel('renderView');
    return Mn.View.extend({
        model: model,
        template: _.template(tpl),
        ui: {
            save: '#save',
            create: '#create'
            // successMessage: '.msg-success',
        },
        events: {
            'click @ui.save': 'openSaveDialog',
            'click @ui.create': 'openNewGalleryDialog',
        },
        openSaveDialog: function() {
            console.log('openSaveDialog from webcam');
            renderChannel.trigger("show:dialog");
        },
        openNewGalleryDialog: function() {
            console.log('openNewGalleryDialog');
        },

    });
})