define([
    'backbone',
], function (Backbone) {
    'use stric';

    return Backbone.Model.extend({
        defaults: {
            place: 'some place',
            state: 'some state',
            url: 'some url from model.js',
            active: false
        }
    })
})