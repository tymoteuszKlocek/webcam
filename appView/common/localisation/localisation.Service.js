define([
    'backbone',
    'backboneLocalstorage',
], function (Bb, Store) {
    'use strict';

    var latitude;
    var longitude;
    var position
    return Bb.Model.extend({

        defaults: {
            lat: 51.237923,
            lng: 22.527440
        },

        initialize: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setNewPosition, this.showError);
            } else {
                alert("I can't use localisation, you have to let your browser to use it.")
            }
        },

        getLocalisation: function () {
            var position = latitude + ',' + longitude;
            return position;
        },

        setNewPosition: function (position) {
            if (position.coords.latitude !== undefined && position.coords.longitude !== undefined) {
                latitude = position.coords.latitude.toFixed(6);
                longitude = position.coords.longitude.toFixed(6);
            }
        },
        //this is because of often errors in navigator
        showError: function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
            }
        },

        localStorage: new Store('webcam-localisation-backbone')
    })
})








