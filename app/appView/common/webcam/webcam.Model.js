define([
    'backbone',
    'backboneLocalstorage',
], function(Bb, Store) {
    'use strict';

    return Bb.Model.extend({
        urlRoot: '/webcam', //???
        defaults: {
            //id: '', //- why i can't use it here?
            city: '',
            country: '',
            countryCode: '',
            views: '',
            title: 'No data',
            url: '',
            state: 'scanner', // state for 'scanner/list' view display default buttons
            thumbnail: '',
            position: ''
        },
        localStorage: new Store('webcam-backbone')
    })
})