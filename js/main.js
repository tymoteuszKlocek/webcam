require.config({
    paths: {
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        radio: '../node_modules/backbone.radio/build/backbone.radio',
        marionette: '../node_modules/backbone.marionette/lib/backbone.marionette',
        jquery: '../node_modules/jquery/dist/jquery',
        tpl: '../node_modules/requirejs-tpl/lib/tpl',
        text: '../node_modules/text/text',
        localStorage: '../node_modules/backbone.localstorage/src/localstorage',
        //bootstrap: 'lib/bootstrap.min'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        radio: {
            exports: 'Backbone.Radio',
            deps: ['backbone']
        },
        localStorage: {
           export: 'backbone.localstorage',
           deps: ['backbone']
        }
        //bootstrap: {
        //    deps: ['jquery']
        //}

    },
    waitSeconds: 60
});

require([
    'app',
    //more...
], function (app) {
    'use strict';

    app.start();
});