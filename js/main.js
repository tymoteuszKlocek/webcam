require.config({
    paths: {
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        radio: '../node_modules/backbone.radio/build/backbone.radio',
        marionette: '../node_modules/backbone.marionette/lib/backbone.marionette',
        jquery: '../node_modules/jquery/dist/jquery',
        tpl: '../node_modules/requirejs-tpl/lib/tpl',
        text: '../node_modules/text/text',
        templates: './templates'
        //localStorage: '../node_modules/backbone.localStorage/src/localStorage',
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

        radio: {
            exports: 'Radio',
            deps: ['backbone']
        },

        marionette: {
            exports: 'Backbone.Marionette',
            deps: [ 'backbone', 'radio']
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