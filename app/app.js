define([
    'backbone',
    'marionette',
    'app/appView/appView',
    'app/appView/scanner/scanner.View',
    'router'
], function (Bb, Mn, AppView,Scanner, Router) {
    'use strict';

    var filterChannel = Bb.Radio.channel('filter'); // define here on inside app?
    var app = new Mn.Application({
        region: '#app-container',
        onBeforeStart: function () {
            this.appView = new AppView();
            this.router = new Router();
            this.appView.showChildView('main', new Scanner());
            this.showView(this.appView);
        },
        onStart: function () {
            filterChannel.reply('filterState', function (view) {
                app.appView.showChildView('main', view);
                app.showView(app.appView);
            });
        },        
    });

    app.on("before:start", function (options) {
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    return window.app = app;
});