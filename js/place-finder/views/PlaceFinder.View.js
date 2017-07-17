define([
    'marionette',
    'text!templates/placeFinder.html',
    'underscore',
    'place-finder/models/placeFinder.Model'
], function (Marionette, template, _, Model) {
    'use strict';

    return Marionette.View.extend({
        template: _.template(template),
        model: Model,
        templateContext: {
            url: 'url from context'
        }
        
    });
})