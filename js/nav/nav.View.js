define([
    'marionette',
    'text!nav/nav.html'
], function (Marionette, tpl) {
    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl)
    });
})