define([
    'marionette',
    'text!app/nav/nav.View.html',
    'app/nav/nav.Model',
    'app/common/localisation/localisation.Service'
], function (Mn, tpl, Model, LocalisationService) {
    'use strict';

    var localisationService = new LocalisationService();
    return Mn.View.extend({
        template: _.template(tpl),
        model: new Model(),
        ui: {
            scanner: '#scanner'
        },
        modelEvents: {
            'change': 'render'
        },
        initialize: function () {
            var self = this;
            localisationService.getLocalisation().then(function (response) {
                self.model.set('position', response);
            });
        },
        events: {
            'click @ui.scanner': 'setUpAutcomplete'
        },
        onSetUpAutcomplete: function() {
            this.trigger('show:autocomplete');
        }
    })
})