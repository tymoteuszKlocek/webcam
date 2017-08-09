define([
    'marionette',
    'text!app/map/weather-widget/weatherWidget.View.html',
    'app/map/weather-widget/weatherWidget.Model',
    'app/map/weather-widget/weatherSession'
], function (Mn, tpl, Model, WeatherSession) {
    'use strict';

    
    
    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),

        initialize: function (options) {
            this.weather = new WeatherSession();
            this.prepareCoords(options.position);
        },

        prepareCoords: function (str) {

            var arr = str.split(',');
            var lat = arr[0].slice(0, 2);
            var lng = arr[1].slice(0, 2);
            var self = this;

            this.weather.searchByCoordinates(lat, lng).then(function (resp) {
                self.model.set("temp", resp.main.temp);
                self.model.set("pressure", resp.main.pressure);
                self.model.set("humidity", resp.main.humidity);
                self.model.set("clouds", resp.clouds.all);
                self.render();
            });
        },
    })
});