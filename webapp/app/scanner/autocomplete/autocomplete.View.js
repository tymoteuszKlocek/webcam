define([
    'backbone',
    'marionette',
    'text!app/scanner/autocomplete/autocomplete.View.html',
    'app/scanner/autocomplete/autocomplete.Model',
], function (Bb, Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),
        className: 'input-group'
    });
});