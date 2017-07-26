define([
    'marionette',
    'text!app/appView/nav/nav.View.html'
], function(Mn, tpl) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),
    })
})