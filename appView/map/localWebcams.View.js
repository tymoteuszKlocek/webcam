define([
    'marionette',
    'text!appView/map/localWebcams.View.html',
    'appView/map/localWebcams.Model',
    'appView/map/weather-widget/weatherWidget.View'
], function (Mn, tpl, Model, WeatherWidget) {
    'use strict';

    var model = new Model();
    var widget;

    return Mn.View.extend({
        model: model,
        template: _.template(tpl),
        modelEvents: {
            change: 'render'
        },
        regions: {
            widgetRegion: '#widget'
        },

        initialize: function (options) {
            this.model.set('localisation', options.position);
            this.model.set('country', options.country);
        },

        onRender: function (obj) {
            widget = new WeatherWidget({ position: obj.options.position })
            this.showChildView('widgetRegion', widget);
        },
    })
});