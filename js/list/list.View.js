define([
    'marionette',
    'text!list/listItem.html',
], function (Mn, tpl) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),
        tagName: 'li',
        //TODO View RWD
        className: 'list',
        ui: {
            link: '#link',
        },
        triggers:{
            'click @ui.link': 'title:selected'
        }

    });
})