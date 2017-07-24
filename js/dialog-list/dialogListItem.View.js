define([
    'marionette',
    'text!dialog-list/dialogListItem.html',
    'dialog-list/dialogListItem.Model'
], function (Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),
        tagName: 'li',
        //TODO View RWD
        className: 'links',
        ui: {
            link: '#link',
        },
        triggers:{
            'click @ui.link': 'title:selected'
        }

    });
})