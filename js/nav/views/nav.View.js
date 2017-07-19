define([
    'marionette',
    'templates'
], function (Marionette, tpl) {
    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl.nav)
    });
})