define([
    'backbone',
    'marionette',
    'typeahead', //for more info see: https://github.com/aodin/Backbone.Typeahead
    'appView/scanner/autocomplete/autocomplete.Collection',
    'text!appView/scanner/autocomplete/typeahead.html',
], function (Bb, Mn, TypeaheadConstructor, Collection, tpl) {
    'use strict';

    var collection = new Collection();
    collection.fetch({
        url: 'appView/scanner/autocomplete/countries.lib.json',
        success: function (collection, response) {
            //console.log('fetched', collection, response);
        },
        error: function (error) {
            console.log('error', error);
        }
    });
    
    return TypeaheadConstructor.extend({
        collection: collection,
        template: _.template(tpl),
        events: {
            'click li': 'chooseCountry',
        },
    });

})