define([
    'backbone',
    'app/map/weather-widget/weatherSession'
], function (Bb, WeatherSession) {
    'use strict';

    var weather = new WeatherSession();
    return Bb.Model.extend({
        defaults: {
            temp: 0,
            pressure: 0,
            humidity: 0,
            clouds: 0
        },

    })
})