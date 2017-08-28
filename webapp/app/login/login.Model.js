define([
    'backbone',
    'app/scanner/scanner.View',
    'app/controller/sessionCtrl'
], function (Bb, Scanner, Session) {
    'use strict';

    return Bb.Model.extend({
        url: "http://127.0.0.1:3000/login",
        defaults: {
            username: null,
            password: null,
            confirmPassword: null,
            email: null
        },

        initialize: function () {
            this.filterChannel = Bb.Radio.channel('filter');
            this.session = new Session();
        },

        sendRequest: function (opt) {
            console.log('i send req', opt)
            var self = this;
            if (opt === 'create-user') {
                return Backbone.ajax(_.extend({
                    url: 'http://127.0.0.1:3000/register',
                    method: "POST",
                    data: this.attributes,
                    dataType: "json",
                })).then(function (resp) {
                        console.log(11, resp);
                        if (resp.success) {
                            console.log('i ste cred', resp.userID);
                            self.session.setCredentials(resp.userID);
                            self.filterChannel.request('filterState', new Scanner());
                        } else {
                            console.log('fuck');
                        }
                });
            } else if (opt === 'login') {
                return this.save().then(function (resp) {
                    console.log(11, resp);
                    if (resp.success) {
                        console.log('i set cred', resp.userID);
                        self.session.setCredentials(resp.userID);
                        self.filterChannel.request('filterState', new Scanner());
                    } else {
                        console.log('fuck');
                    }
                })
            }
            // for anything more complex, make a custom call.

        },

        logout: function () { /*...*/ },
        isAuthenticated: function () { /*...*/ }
    })
})

