define([
    'backbone',
    'json!app/config/config.json',
], function (Backbone, conf) {
    'use strict';

    return Backbone.Model.extend({
        url: conf.requests.sessionUrl,

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