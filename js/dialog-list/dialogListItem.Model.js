define([
    'backbone',
], function (Backbone) {
    'use stric';

    return Backbone.Model.extend({
        defaults: {
            title: 'some place',
            url: 'some url from model.js',
            active: false
        }
    })
})