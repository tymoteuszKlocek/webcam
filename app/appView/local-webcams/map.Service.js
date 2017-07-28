define([
    'marionette'
], function (Mn) {
    'use strict';

    return Mn.Object.extend({
        getLocation: function () {
            var pos = {
                lat: 0,
                lng: 0
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos.lat = position.coords.latitude.toFixed(6);
                    pos.lng = position.coords.longitude.toFixed(6);
                    console.log('Your position: ', pos);
                    return pos;
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

    })
});