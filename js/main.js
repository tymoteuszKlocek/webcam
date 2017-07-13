require.config({
    paths: {
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        marionette: '../node_modules/backbone.marionette/lib/backbone.marionette',
        jquery: '../node_modules/jquery/dist/jquery',
        localStorage: '../node_modules/backbone.localStorage/backbone.localStorage',
        //tpl: 'lib/tpl',
        //bootstrap: 'lib/bootstrap.min'
    },

    shim: {
        underscore: {
            exports: '_'
        },

        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },

        marionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        },

        bootstrap: {
            deps: ['jquery']
        }

    },
    waitSeconds: 60
});

require([
    'app',
    'modules/Pages',
    'jquery',
    'bootstrap'
], function (app, PagesModule) {
    'use strict';

    app.addInitializer(function () {
        PagesModule.start();
    });

    app.start();
});