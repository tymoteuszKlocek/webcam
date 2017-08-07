define([
    'backbone',
    'backboneLocalstorage',
], function (Bb, Store) {
    'use strict';

    return Bb.Model.extend({
        urlRoot: '/webcams',
        defaults: {
            city: '',
            country: '',
            countryCode: '',
            views: '',
            lat: '',
            lng: '',
            position: '',
            thumbnail: '',
            state: 'scanner',
            title: 'name unknown',
            link: ''
        },

        localStorage: new Store('webcam-backbone')
    })
})