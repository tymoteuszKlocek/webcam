define([
    'marionette',
    'text!webcam/webcam.html',
    'webcam/webcam.Model'
], function(Mn, tpl, Model) {
    'use strict';
    
    return Mn.View.extend({
        template: _.template(tpl),
        tagName: 'li',
        className: 'webcam-item',
        ui: {
            save: '#save',
            delete: '#delete'
        },
        triggers: {
            'click @ui.save': 'open:dialog',
            'click @ui.delete': 'close:webcam',
        },
    
    });
})