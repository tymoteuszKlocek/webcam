define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bn.Model.extend({
        defaults: {
            title: 'Page title',
            content: 'Page content',
            active: false,
            name: '404'
        }
        
    })
})