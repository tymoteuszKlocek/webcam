define([
    'marionette',
    'text!app/nav/nav.View.html',
    'app/nav/nav.Model',
    'app/common/localisation/localisation.Service'
], function (Mn, tpl, Model, LocalisationService) {
    'use strict';
 
    return Mn.View.extend({
        template: _.template(tpl),
        model: new Model(),
        ui: {
            scanner: '#scanner'
        },

        modelEvents: {
            'change': 'render'
        },

        initialize: function (options) {
            var self = this;
            this.localisationService = new LocalisationService();
            this.localisationService.getLocalisation().then(function (response) {
                self.model.set('position', response);
            });
            this.vent = options.vent;
        },
        triggers: {
            'click @ui.scanner': 'scanner:clicked'
        },
    })
})