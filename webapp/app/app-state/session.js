define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            logged: false,
            username: ''
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