define([
    'backbone',
    'backboneLocalstorage',
], function(Bb, Store) {
    'use strict';

    return Bb.Model.extend({
        urlRoot: '/webcam', //what is this, do i need it?
        // if you're using a model outside of a collection, to enable the default 
        // url function to generate URLs based on the model id
        defaults: {
            title: 'default title',
            url: 'https://c402277.ssl.cf1.rackcdn.com/photos/2842/images/hero_small/shutterstock_12730534.jpg?1352150501',
            state: 'scanner', // state for 'scanner/list' view display default buttons
            thumbnail: '', 
        },
        localStorage: new Store('webcam-backbone')
    })
})