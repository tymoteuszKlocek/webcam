define([
    'backbone',
], function (Bb, Store) {
    'use strict';

    var LAT = 51.2379945;
    var LNG = 22.5269071;

    (function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                LAT = position.coords.latitude.toFixed(6);
                LNG = position.coords.longitude.toFixed(6);
                 console.log(LAT, LNG);
            });
        } else {
            alert("I can't use localisation")
        }

        
    })();

    var API_KEY = '?key=AIzaSyB7ppMoa2FbrcxYVRuwFdm9e5UEb281t9o';
    var MODE = 'view';
    var POSITION = '&center=' + LAT + ',' + LNG;
    var ZOOM = '&zoom=18';
    var SRC = 'https://www.google.com/maps/embed/v1/';
    var TYPE = '&maptype=satellite';

    return Bb.Model.extend({
        urlRoot: '/map',
        defaults: {
            url: SRC + MODE + API_KEY + POSITION + ZOOM + TYPE
        },
    })
})