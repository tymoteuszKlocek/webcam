define([
    'backbone',
    'app/scanner/scanner.View'
], function (Bb, Scanner) {
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
        },

        sendRequest: function (opt) {
            console.log('i send req', opt)
            var self = this;
            if (opt === 'create-user') {
                return Backbone.ajax(_.extend({
                    url: 'http://127.0.0.1:3000/create-user',
                    method: "POST",
                    data: this.attributes,
                    dataType: "json",
                })).then(function (resp) {
                    try {
                        console.log(resp);
                        if (resp.success) {
                            self.filterChannel.request('filterState', new Scanner());
                        } else {
                            
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                });
            } else if (opt === 'login') {
                console.log('attr', this.attributes);
                return this.save().then(function (resp) {
                    try {
                        console.log(resp);
                        if (resp.success) {
                            self.filterChannel.request('filterState', new Scanner());
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                })
            }
            // for anything more complex, make a custom call.

        },

        logout: function () { /*...*/ },
        isAuthenticated: function () { /*...*/ }
    })
})

