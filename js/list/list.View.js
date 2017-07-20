define([
    'marionette',
    'text!list/listItem.html',
], function (Mn, tpl) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl)
    });
})