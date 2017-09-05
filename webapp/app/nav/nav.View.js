define([
    'backbone', 
    'marionette',
    'text!app/nav/nav.View.html',
    'app/nav/nav.Model',
    'app/common/localisation/localisation.Service',
    'app/auth'
], function (Bb, Mn, tpl, Model, LocalisationService, Auth) {
    'use strict';
 
    return Mn.View.extend({

        template: _.template(tpl),

        model: new Model(),

        ui: {
            logout: '#logout',
            position: '#my-position'
        },
        
        events: {
            'click @ui.logout': 'logout',
            'click @ui.position': 'checkMyPosition'
        },

        modelEvent: {
            'change:attribute': 'checkMyPosition'
        },

        initialize: function () {
            var self = this;
            this.position = '';
            this.localisationService = new LocalisationService();
            this.localisationService.getLocalisation().then(function (response) {
                self.position = response;
                self.model.set('position', response);
            });
        },

        checkMyPosition: function() {
            this.model.set('position', this.position);
        },

        logout: function() {
            var self = this;
            this.model.logout().done(function() {
                Auth.set('logged', false);
                self.accessChannel.trigger('access:denied');
                window.location.reload();
            });
        } 
    });
});