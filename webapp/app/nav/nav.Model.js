define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({

        url: "http://127.0.0.1:3000/login",

        defaults: {
            position: 'unknown position',
        },

        logout: function () {
            console.log('logout nav')
            return Backbone.ajax(_.extend({
                url: 'http://127.0.0.1:3000/logout',
                method: "POST",
                dataType: "json",
            })).then(function(resp) {
                return resp;
            })
        },
    })
})