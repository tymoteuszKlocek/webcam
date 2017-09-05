define([
    'marionette',
    'text!app/map/localWebcams.View.html',
    'app/map/localWebcams.Model',
    'app/map/weather-widget/weatherWidget.View',
], function (Mn, tpl, Model, WeatherWidget) {
    'use strict';

    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),
        modelEvents: {
            change: 'render'
        },
        regions: {
            widgetRegion: '#widget'
        },

        initialize: function (options) {
            this.widget = new WeatherWidget({ position: options.position })
            this.model.set('localisation', options.position);
            this.model.set('country', options.country);
        },

        onRender: function () {
            this.showChildView('widgetRegion', this.widget);
        },
    });
});