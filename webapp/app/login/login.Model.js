define([
    'backbone'
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        url: 'http://127.0.0.1:3000/login',
        defaults: {
            username: null,
            password: null,
            confirmPassword: null,
            email: null
        },

        register: function () {
            return Bb.ajax(_.extend({
                url: 'http://127.0.0.1:3000/register',
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
                url: 'http://127.0.0.1:3000/refresh',
                method: 'POST',
                data: '',
                dataType: 'json',
            })).then(function (resp) {
                return resp;
            }).catch((error) => {
                return error;
            });
        }

    });
});

