define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            position: 'unknown position',
        },
    })
})