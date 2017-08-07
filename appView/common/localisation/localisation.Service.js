define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({

        defaults: {
            lat: 51.237923,
            lng: 22.527440
        },

        getLocalisation: function () {
            return new Promise(function(resolve, reject) {
                navigator.geolocation.getCurrentPosition(function(response) {
                    var position = response.coords.latitude.toFixed(6) + ',' + response.coords.longitude.toFixed(6);
                    resolve(position);
                }, function(error) {
                    console.log(error);
                    reject(error);
                });
            });
        },

    })
})








