define([
    'marionette',
    'text!app/appView/local-webcams/localWebcams.View.html',
    'app/appView/local-webcams/localWebcams.Model',
    'app/appView/local-webcams/weather-widget/weatherWidget.View'
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
        initialize: function(options) {
            this.model.set('localisation', options.position);
        },
        onRender: function (view) {
            widget = new WeatherWidget({ position: view.options.position })
            this.showChildView('widgetRegion', widget);
        }
    })
});