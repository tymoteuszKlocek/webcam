define([
    'marionette',
    'text!app/appView/local-webcams/localWebcams.View.html',
    'app/appView/local-webcams/localWebcams.Model',
    'app/appView/local-webcams/weatherSession'
], function (Mn, tpl, Model, WeatherSession) {
    'use strict';

    var weather = new WeatherSession();
    var model = new Model();
    var position = undefined;
    return Mn.View.extend({
        model: model,
        template: _.template(tpl),
        modelEvents: {
            change: 'render'
        },
        initialize: function (obj) {
            if (Object.getOwnPropertyNames(obj).length > 0) {
                position = obj.params;
            } else {
                position = '51.2379945,22.5269071' //default coords of DataArt Lublin 
            }
            this.prepareCoords(position);
        },
        onBeforeRender: function () {
            this.model.set("localisation", position);
        },
        prepareCoords: function (str) {
            var arr = str.split(',');
            var lat = arr[0].slice(0, 2);
            var lng = arr[1].slice(0, 2);
            var self = this;
            weather.searchByCoordinates(lat, lng).then(function (resp) {
                self.model.set("temp", resp.main.temp);
                self.model.set("pressure", resp.main.pressure);
                self.model.set("humidity", resp.main.humidity);
                self.model.set("clouds", resp.clouds.all);
                self.render();
            });
        },
        onRender: function () {
            console.log('render model;', this.model);
        }
    })
});