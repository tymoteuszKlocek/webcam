define([
    'backbone'
], function (Bb) {
    'use strict';

    var SRC = 'http://api.openweathermap.org/data/2.5/weather?';
    var LAT = 'lat=';
    var LNG = '&lon=';
    var API_KEY = '&APPID=f3d32423aef9fd1c0faab94c6767a59f';
    var METRIC = '&units=metric';

    return Bb.Model.extend({
        searchByCoordinates: function (lat, lng) {
            return Bb.ajax(_.extend({
                url: SRC + LAT + lat + LNG + lng + API_KEY + METRIC,
                type: 'GET',
                data: {}, // Additional parameters here
                dataType: 'json',
                success: function (data) { },
                error: function (err) { alert(JSON.stringify(err)); },
            }));
        }

    })
})
