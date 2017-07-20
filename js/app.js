/*global define */

define([
    'backbone',
    'marionette',
    'app/appView',
    'routers/index'
], function (Backbone, Marionette, AppView, Router) {
    'use strict';

    var app = new Marionette.Application({
        region: '#app-container',

        onStart: function () {
            var appView = new AppView();
            this.showView(appView);
            var router = new Router();
        }
    });

    app.on("before:start", function (options) {

        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    return window.app = app;
});