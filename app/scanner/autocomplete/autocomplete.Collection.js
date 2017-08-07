define([
    'backbone',
    'app/scanner/autocomplete/autocomplete.Model',
    'backboneLocalstorage',
], function(Bb, Model, Store) {
    'use strict';
    
    return Bb.Collection.extend({
        url: 'app/common/lib/countries.lib.json',
        model: Model,
    });
});