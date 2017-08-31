define([
    'marionette',
    'text!app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.View.html',
    'app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.Model',
], function (Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),

        template: _.template(tpl),

        tagname: 'li',

        ui: {
            collection: '#collection-item',
            save: '#save-in-collection'
        },

        triggers: {
            'click @ui.save': 'save:collection'
        }
    })

});