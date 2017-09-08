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
        },
        
        events: {
            'click @ui.logout': 'logout'
        },

        modelEvents: {
            'change:attribute': 'checkMyPosition'
        },

        initialize: function () {
            var self = this;
            this.localisationService = new LocalisationService();

            this.localisationService.getLocalisation().then(function (response) {
                self.position = response;
                self.model.set('position', response);
            });
            
            this.model.set('username', Auth.get('username'));
        },

        checkMyPosition: function() {
            this.model.set('position', this.position);
        },

        logout: function() {
            this.model.logout().then(function() {
                Auth.set('logged', false);
                window.location.reload();
            });
        } 
    });
});