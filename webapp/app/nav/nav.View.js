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
            logout: '#logout'
        },
        
        events: {
            'click @ui.logout': 'logout'
        },

        initialize: function (options) {
            var self = this;
            this.localisationService = new LocalisationService();
            this.localisationService.getLocalisation().then(function (response) {
                self.model.set('position', response);
            });
            this.accessChannel = Bb.Radio.channel('access');
        },

        logout: function() {
            var self = this;
            this.model.logout().then(function(resp) {
                Auth.set('logged', false);
                self.accessChannel.trigger('access:denied');
                window.location.reload();
            });
        } 
    })
})