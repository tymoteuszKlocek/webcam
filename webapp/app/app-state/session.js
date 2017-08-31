define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        url: '/',

        defaults: {
            logged: false
        },
        
        initialize: function () {
            // Hook into jquery
            // Use withCredentials to send the server cookies
            // The server must allow this through response headers
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                options.xhrFields = {
                    withCredentials: true
                };
            });
        }
    });

});