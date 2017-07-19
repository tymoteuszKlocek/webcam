define([
    'marionette',
    'templates',
], function (Mn, tpl) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl.item)
    });
})