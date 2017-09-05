define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            temp: 0,
            pressure: 0,
            humidity: 0,
            clouds: 0,
            description: 'no descritption'
        },
    });
});