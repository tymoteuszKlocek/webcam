define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        url: 'http://127.0.0.1:3000/webcams',
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
            link: '',
            collectionID: ''
        },

        // destroy here
    })
})