define([
    'backbone',
    'app/common/localisation/localisation.Service',
    'json!app/config/config.json'
], function (Bb, LocalisationService, conf) {
    'use strict';

    return Bb.Model.extend({

        url: conf.req.apiUrl + conf.req.logout,

        defaults: {
            position: conf.map.POS, // default position is DataArt Lublin
            username: ''
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
    
            // return Bb.ajax(_.extend({
            //     url: conf.req.logoutUrl,
            //     method: 'POST',
            //     dataType: 'json',
            // })).then(function(resp) {
            //     return resp;
            // });
        },
    });
});