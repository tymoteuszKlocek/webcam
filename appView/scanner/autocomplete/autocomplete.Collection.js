define([
    'backbone',
    'appView/scanner/autocomplete/autocomplete.Model',
    'backboneLocalstorage',
], function(Bb, Model, Store) {
    'use strict';
    
    return Bb.Collection.extend({
        url: 'appView/scanner/autocomplete/countries.lib.json',
        model: Model,
    });
});