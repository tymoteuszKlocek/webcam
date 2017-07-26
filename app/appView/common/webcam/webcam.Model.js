define([
    'backbone',
    'backboneLocalstorage'
], function(Bb, Store) {
    'use strict';

    return Bb.Model.extend({
        urlRoot: '/webcam', //??? what is this, do i need it?
        defaults: {
            title: 'webcam title',
            url: 'https://c402277.ssl.cf1.rackcdn.com/photos/2842/images/hero_small/shutterstock_12730534.jpg?1352150501',
            info: {},
        },
        localStorage: new Store('webcam-backbone'),
    })
})