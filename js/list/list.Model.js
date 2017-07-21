define([
    'backbone'
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            title: 'Item from list',
            id: 0,
            active: false
        },
    })
});