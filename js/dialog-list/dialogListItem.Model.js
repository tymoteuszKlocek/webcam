define([
    'backbone',
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            title: 'some place',
            url: 'some url from model.js',
            active: false
        }
    })
})