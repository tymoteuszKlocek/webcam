define([
    'backbone',
    'appView/scanner/autocomplete-country-city/autocomplete.Model',
    'backboneLocalstorage',
], function(Bb, Model, Store) {
    'use strict';
    
    return Bb.Collection.extend({
        url: 'appView/scanner/autocomplete-country-city/countries.lib.json',
        model: Model,
        initialize: function() {
        },
        parse: function(response) {
            return response;
        },
    })
});