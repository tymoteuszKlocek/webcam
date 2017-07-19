define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            title: 'Page title',
            url: '#/url',
            active: false
        }
    })
});