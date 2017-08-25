define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        url: "http://127.0.0.1:3000/collections",
        defaults: {
            userID: null,
            title: 'title'
        }
    })
})

