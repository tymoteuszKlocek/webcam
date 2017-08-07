define([
    'backbone',
    'marionette',
    'text!appView/scanner/autocomplete/autocomplete.View.html',
    'appView/scanner/autocomplete/autocomplete.Model',
], function (Bb, Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),
        className: 'input-group'
    })
})