require.config({
    paths: {
        backbone: './node_modules/backbone/backbone',
        marionette: './node_modules/backbone.marionette/lib/backbone.marionette',
        underscore: './node_modules/underscore/underscore',
        jquery: './node_modules/jquery/dist/jquery',
        'backbone.radio': './node_modules/backbone.radio/build/backbone.radio',
        text: "./node_modules/requirejs-text/text",
        css: './node_modules/require-css/css',
        json: './node_modules/requirejs-plugins/src/json',
        bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min',
        typeahead: './node_modules/backbone.typeahead.js/backbone.typeahead',
    },

    shim: {
        bootstrap: {
            deps: ['jquery'],
        },
        typeahead: {
            exports: 'Backbone.Typeahead',
            deps: ['backbone']
        }
    },

    waitSeconds: 60

});

require([
    './app/app',
], function (app) {
    'use strict';

    app.start();
});