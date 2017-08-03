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
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                var url = SRC + LAT + lat + LNG + lng + API_KEY + METRIC;

                xhr.open("GET", url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject(xhr.statusText);
                };
                xhr.send();
            })
        }
    });

})
