define([
    'backbone',
    'backboneLocalstorage',
], function (Bb, Store) {
    'use strict';

    return Bb.Model.extend({
        //url: '/webcams',
        defaults: {
            city: '',
            country: '',
            countryCode: '',
            views: '',
            lat: '',
            lng: '',
            position: '',
            thumbnail: '',
            type: 'scanner',
            title: 'name unknown',
            link: ''
        },

        localStorage: new Store('webcam-backbone')
    })
})