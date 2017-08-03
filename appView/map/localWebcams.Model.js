define([
    'backbone',
], function (Bb, Store) {
    'use strict';

    var LAT = 51.2379945; // default localisatin on DATAART IN LUBLIN
    var LNG = 22.5269071;
    var API_KEY = '?key=AIzaSyB7ppMoa2FbrcxYVRuwFdm9e5UEb281t9o';
    var MODE = 'view';
    var POSITION = '&center=';
    var LOCALISATION = LAT + ',' + LNG;
    var ZOOM = '&zoom=18';
    var SRC = 'https://www.google.com/maps/embed/v1/';
    var TYPE = '&maptype=satellite';

    return Bb.Model.extend({
        urlRoot: '/map',
        defaults: {
            url: SRC + MODE + API_KEY,
            position: POSITION,
            localisation: LOCALISATION,
            zoom: ZOOM,
            type: TYPE
        },
    })
})