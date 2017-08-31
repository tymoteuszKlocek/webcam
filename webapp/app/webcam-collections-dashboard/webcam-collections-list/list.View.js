define([
    'marionette',
    'text!app/webcam-collections-dashboard/webcam-collections-list/list.View.html',
    'app/webcam-collections-dashboard/webcam-collections-list/list.Model',
], function (Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),

        template: _.template(tpl),

        tagname: 'li',

        ui: {
            removeItem: '#remove-item',
            collection: '#collection-item'
        },

        triggers: {
            'click @ui.removeItem': 'remove:item',
            'click @ui.collection': 'get:collection'
        }
    })

});