define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        url: '/',

        defaults: {
            credentials: '',
            sessionID: undefined
        },

        initialize: function () {
        },



        getAuth: function () {
            //console.log('session user', )
        },

        setCredentials: function (user) {
            
            //var ID = this.model.userID;
            if (user !== '') {
                //this.model.set({user: user})
                console.log('iD!', user)
                var originalSync = Backbone.sync;
                return Backbone.sync = function (method, model, options) {
                    options.headers = options.headers || {};
                    _.extend(options.headers, { 'Auth-Token': user });
                    originalSync.call(model, method, model, options);
                }
            }

        },
    });
});