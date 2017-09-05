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

        sendRequest: function (opt) {
            if (opt === 'create-user') {
                return Bb.ajax(_.extend({
                    url: 'http://127.0.0.1:3000/register',
                    method: 'POST',
                    data: this.attributes,
                    dataType: 'json',
                })).then(function (resp) {
                    return resp;
                });
            } else if (opt === 'login') {
                return this.save().then(function (resp) {
                    return resp;
                });
            }

        },

    });
});

