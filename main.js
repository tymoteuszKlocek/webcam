require.config({

    paths: {
        underscore: './node_modules/underscore/underscore',
        backbone: './node_modules/backbone/backbone',
        'backbone.radio': './node_modules/backbone.radio/build/backbone.radio',
        marionette: './node_modules/backbone.marionette/lib/backbone.marionette',
        jquery: './node_modules/jquery/dist/jquery',
        text: './node_modules/requirejs-text/text',
        backboneLocalstorage: './node_modules/backbone.localstorage/backbone.localStorage',
        bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min',
        typeahead: './node_modules/backbone.typeahead.js/backbone.typeahead',
        jqueryui: './node_modules/jquery-ui/jquery-ui'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        'backbone.radio': {
            exports: 'Backbone.Radio',
            deps: ['backbone']
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        },
        bootstrap: {
            deps: ['jquery']
        },
        typeahead: {
            exports: "Backbone.Typeahead",
            deps: ['backbone']
        },
        jqueryui: {
            exports: "jquery-ui",
            deps: ['jquery']
        }

    },

    waitSeconds: 60

});

require([
    './app',
], function (app) {
    'use strict';

    app.start();
});