define([
    'backbone',
], function (Backbone) {
    'use stric';

    return Backbone.Model.extend({
        defaults: {
            country: 'some place',
            category: 'some state',
            url: 'some url from model.js',
            active: false
        }
    })
})