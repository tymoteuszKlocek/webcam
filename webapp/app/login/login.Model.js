define([
    'backbone'
], function (Bb) {
    'use strict';

    return Bb.Model.extend({
        url: "http://127.0.0.1:3000/login",
        defaults: {
            username: null,
            password: null,
            confirmPassword: null,
            email: null
        },

        sendRequest: function (opt) {
            var self = this;
            if (opt === 'create-user') {
                return Backbone.ajax(_.extend({
                    url: 'http://127.0.0.1:3000/register',
                    method: "POST",
                    data: this.attributes,
                    dataType: "json",
                })).then(function (resp) {

                    if (resp.success) {
                        this.render();
                    } else {
                        console.log('sth is wrong in registr');
                    }
                });

            } else if (opt === 'login') {
                return this.save().then(function (resp) {
                    console.log(resp);
                    if(resp.success) {
                        return resp;
                    } else {
                        console.log(resp);
                    }
                })
            }

        },

        logout: function () {
            return Backbone.ajax(_.extend({
                url: 'http://127.0.0.1:3000/logout',
                method: "POST",
                data: this.attributes,
                dataType: "json",
            })).then(function(resp, w, e) {
                console.log(resp, w)
            
            })
        },

        isAuthenticated: function () { /*...*/ }
    })
})

