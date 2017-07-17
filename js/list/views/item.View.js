define([
    'marionette',
    'underscore',
    'text!templates/item.html',
    'list/models/item.Model'
], function (Mn, _, tpl, Model) {
    'use strict';

    return Mn.View.extend({
        model: Model,
        template: _.template(tpl, Model)
    })
})