define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        url: 'http://localhost:8000/',

        defaults: {
            logged: false
        },
        
        initialize: function () {
            // This is global configuration
            // Use withCredentials to send the server cookies
            // The server must allow this through response headers
            $.ajaxPrefilter(function (options) {
                options.xhrFields = {
                    withCredentials: true
                };
            });
        }
    });

});