define([
    'marionette',
    'templates',
    'webcam/models/webcam.Model'
], function(Mn, tpl, Model) {
    'use strict';

    var model = new Model();
    return Mn.View.extend({
        model: Model,
        template: _.template(tpl.webcam, model)
    });
})