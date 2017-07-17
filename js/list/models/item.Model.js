define([
    'backbone'
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            title: 'Item from list',
            url: 'url',
            active: true
        },
        choose: function () { }
    })
});