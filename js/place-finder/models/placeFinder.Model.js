define([
    'backbone',
], function (Backbone) {
    'use stric';

    return Backbone.Model.extend({
        defaults: {
            url: 'some url from model.js',
            active: false
        }
    })
})