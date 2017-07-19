define([
    'backbone'
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            title: 'Item from list',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            state: 'some info',
            active: false
        },
        choose: function () { }
    })
});