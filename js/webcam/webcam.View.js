define([
    'marionette',
    'text!webcam/webcam.html',
    'webcam/webcam.Model'
], function(Mn, tpl, Model) {
    'use strict';

    var model = new Model();
    return Mn.View.extend({
        model: model,
        template: _.template(tpl)
    });
})