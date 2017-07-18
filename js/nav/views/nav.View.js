define([
    'marionette',
    'underscore',
    'text!templates/nav.html',
	'nav/models/nav.Model'
], function (Marionette, _, tpl, Model) {
    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        
    });
})