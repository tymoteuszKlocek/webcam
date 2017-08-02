define([
    'backbone',
    'backboneLocalstorage',
], function (Bb, Store) {
    'use strict';

    var latitude;
    var longitude;
    return Bb.Model.extend({
        
        defaults: {
            lat: 51.237923,
            lng: 22.527440
        },

        initialize: function () {
            var self = this;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    self.lat = position.coords.latitude.toFixed(7);
                    self.lng = position.coords.longitude.toFixed(7);
                });
            } else {
                alert("I can't use localisation, you have to let your browser to use it.")
            }
        },

        getLocalisation: function () {
            var position = this.lat + ',' + this.lng
            return position;
        },

        localStorage: new Store('webcam-localisation-backbone')
    })
})








