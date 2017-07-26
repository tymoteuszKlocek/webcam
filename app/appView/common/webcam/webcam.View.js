define([
    'marionette',
    'text!app/appView/common/webcam/webcam.View.html',
    'app/appView/common/webcam/webcam.Model',
], function(Mn, tpl, Model) {
    'use strict';

    //var model = new Model();
    return Mn.View.extend({
        template: _.template(tpl),
        tagname: 'li',
        className: 'media',
        ui: {
            save: '#save',
            delete: '#delete'
        },
        triggers: {
            'click @ui.save': 'child:save',
            'click @ui.delete': 'child:delete'
        },
    })
})