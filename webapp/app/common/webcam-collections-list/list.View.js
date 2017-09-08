define([
    'marionette',
    'text!app/common/webcam-collections-list/list.View.html',
    'app/common/webcam-collections-list/list.Model',
], function (Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),

        template: _.template(tpl),

        tagname: 'li',

        ui: {
            removeItem: '#remove-item',
        },

        triggers: {
            'click @ui.removeItem': 'remove:item',
        }
    });

});