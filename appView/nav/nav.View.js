define([
    'marionette',
    'text!appView/nav/nav.View.html',
    'appView/nav/nav.Model',
    'appView/common/localisation/localisation.Service'
], function (Mn, tpl, Model, LocalisationService) {
    'use strict';

    var localisationService = new LocalisationService();
    return Mn.View.extend({
        template: _.template(tpl),
        model: new Model(),
        modelEvents: {
            'change': 'render'
        },
        initialize: function () {
            var self = this;
            localisationService.getLocalisation().then(function (response) {
                self.model.set('position', response);
            });
        },
    })
})