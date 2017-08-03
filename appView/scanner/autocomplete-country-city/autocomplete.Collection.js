define([
    'appView/scanner/autocomplete-country-city/autocomplete.Model',
    'backbone'
], function(Model, Bb) {
    'use strict';
    
    return Bb.Collection.extend({
        model: new Model(),
    })
});