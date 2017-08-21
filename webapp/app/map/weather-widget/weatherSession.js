define([
    'backbone',
    'json!app/config/config.json'
], function (Bb, conf) {
    'use strict';

    return Bb.Model.extend({

        searchByCoordinates: function (lat, lng) {
            return Bb.ajax({
                url: conf.weather.SRC + conf.weather.LAT + lat + conf.weather.LNG + lng + conf.weather.API_KEY + conf.weather.METRIC,
                type: 'GET',
                data: {},
                dataType: 'json',
                success: function (resp) {
                    //console.log('weather', resp);
                },
                error: function (err) { alert(err); },
            })
        }
        
    });

})
