define([
    'backbone'
], function (Bb) {
    'use strict';

    var d = new Date();
    return Bb.Model.extend({
        defaults: {
            title: 'Item from list',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
            country: 'Poland',
            date: d.toDateString(),
            localisation: 'xy'
        },
    })
});