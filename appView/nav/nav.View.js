define([
    'marionette',
    'text!appView/nav/nav.View.html',
    'appView/nav/nav.Model',
    'appView/common/localisation/localisation.Service'
], function(Mn, tpl, Model, LocalisationService) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),
        model: new Model(),

        onRender: function () {
            var localisationService = new LocalisationService();
            var position = localisationService.getLocalisation();
        },
    })
})