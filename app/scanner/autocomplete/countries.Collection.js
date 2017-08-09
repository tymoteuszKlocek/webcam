define([
    'backbone',
    'app/scanner/autocomplete/autocomplete.Model',
], function(Bb, Model) {
    'use strict';
    
    return Bb.Collection.extend({
        url: 'app/common/lib/countries.lib.json',
        model: Model,
    });
});