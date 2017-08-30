define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        url: 'http://127.0.0.1:3000/session',
        default: {
            sessionID: undefined,
            userID: undefined
        },
        initialize: function () {
            var that = this;
            console.log('strong issue')
            // Hook into jquery
            // Use withCredentials to send the server cookies
            // The server must allow this through response headers
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                options.xhrFields = {
                    withCredentials: true
                };
            });
        },

        login: function () {
            console.log('atr', this.attributes)
            return Backbone.ajax(_.extend({
                url: 'http://127.0.0.1:3000/session',
                method: "PUT",
                data: this.attributes,
                dataType: "json",
            }));
        },

        logout: function () {
            // Do a DELETE to /api/session and clear the client side data
            var that = this;
            this.destroy({
                success: function (model, resp) {
                    model.clear({ silent: true });

                    // Set auth to false to trigger a change:logged_in event
                    // The server also returns a new csrf token so that
                    // the user can relogin without refreshing the page
                    that.set({ logged_in: false });
                }
            });
        },

        getAuth: function (callback) {
            // getAuth is wrapped around our router
            // before we start any routers let us see if the user is valid
            if(this.sessionID !== undefined) {
                console.log('session is very ok', this.sessionID)
                callback();
            } else {
                console.log('u r logout', this.sessionID);
            }
            // this.fetch({
            //     success: callback
            // });
        }
    });

});