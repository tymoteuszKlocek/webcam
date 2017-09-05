define([
    'backbone',
    'json!app/config/config.json'
], function (Bb, conf) {
    'use strict';

    return Bb.Model.extend({

        url: 'http://127.0.0.1:8080/',

        searchByCoordinates: function (lat, lng) {
            
            return Bb.ajax(_.extend({
                url: conf.weather.SRC + conf.weather.LAT + lat + conf.weather.LNG + lng + conf.weather.API_KEY + conf.weather.METRIC,
                method: 'GET',
                data: '',
                dataType: 'jsonp',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            })).done(function (resp) {
                return resp;
            }).catch(function (err) {
                return err;
            });
        }

    });

});
