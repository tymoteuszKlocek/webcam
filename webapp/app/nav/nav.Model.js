define([
    'backbone',
    'app/common/localisation/localisation.Service',
], function (Bb, LocalisationService) {
    'use strict';

    return Bb.Model.extend({

        url: 'http://127.0.0.1:3000/login',

        defaults: {
            position: '51.23776,22.52807', // default position is Lublin
            username: 'Josh'
        },

        initialize: function () {
            var self = this;
            this.position = '';
            this.localisationService = new LocalisationService();
            this.localisationService.getLocalisation().then(function (response) {
                self.position = response;
            });
        },

        logout: function () {

            return Bb.ajax(_.extend({
                url: 'http://127.0.0.1:3000/logout',
                method: 'POST',
                dataType: 'json',
            })).then(function(resp) {
                return resp;
            });
        },
    });
});