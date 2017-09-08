define([
    'marionette',
    'text!app/common/gallery/gallery.View.html',
    'app/common/gallery/gallery.Model',
], function (Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({

        model: Model,

        template: _.template(tpl),

        tagname: 'li',

        ui: {
            removeItem: '.remove-item',
            save: '#item',
            mini: '.mini-list-group-item',
            normal: '.list-group-item'
        },

        triggers: {
            'click @ui.removeItem': 'remove:item',
            'click @ui.save': 'save:webcam'
        },

        initialize: function(model) {
            this.type = model.opt.opt;
        },

        onRender: function() {
            if (this.type === 'mini') {
                this.ui.mini.removeClass('hide');
                this.ui.normal.addClass('hide');
            }
        }

    });

});