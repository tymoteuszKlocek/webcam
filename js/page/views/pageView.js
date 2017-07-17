define([
    'marionette',
    'text!templates/page.html'
], function (Mn, tpl) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl)
    });
})