define([
    'backbone'
], function(Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            name: 'default name',
            code: 'default code'
        },
    });
});