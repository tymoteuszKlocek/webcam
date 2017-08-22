define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            username: '',
            password: ''
        },
        validate: function() {

        }
    })
})

