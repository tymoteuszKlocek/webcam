define([
    'marionette',
    'text!app/appView/map/localWebcams.View.html',
    'app/appView/map/localWebcams.Model',
    'app/appView/map/weather-widget/weatherWidget.View'
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