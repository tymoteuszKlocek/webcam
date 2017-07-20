define([
    'backbone'
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            title: 'Item from list',
            active: false
        },
        choose: function () { }
    })
});