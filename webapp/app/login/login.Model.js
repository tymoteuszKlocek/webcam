define([
    'backbone',
    'json!app/config/config.json'
], function (Bb, conf) {
    'use strict';

    return Bb.Model.extend({

        url: conf.req.apiUrl + conf.req.login,
        
        defaults: {
            username: null,
            password: null,
            confirmPassword: null,
            email: null
        },

        register: function () {
            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.register,
                method: 'POST',
                data: this.attributes,
                dataType: 'json',
            })).then(function (resp) {
                return resp;
            }).catch((error) => {
                return error;
            });

        },

        login: function () {
            return this.save().then(function (resp) {
                return resp;
            }).catch((error) => {
                return error;
            });
        },

        refreshAccess: function () {
            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.refresh,
                method: 'POST',
                dataType: 'json',
            })).then(function (resp) {
                return resp;
            }).catch((error) => {
                return error;
            });
        }

    });
});

