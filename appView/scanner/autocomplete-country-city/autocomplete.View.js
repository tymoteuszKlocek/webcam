define([
    'backbone',
    'marionette',
    'typeahead',
    'text!appView/scanner/autocomplete-country-city/autocomplete.View.html',
    'appView/scanner/autocomplete-country-city/autocomplete.Collection',
    'appView/scanner/autocomplete-country-city/autocomplete.Service'
], function (Bb, Mn, Autocomplete, tpl, Collection, AutocompleteService) {
    'use strict';

    var collection = new Collection();
    //https://github.com/aodin/Backbone.Typeahead/blob/master/docs/bootstrap2.html
    var queryset = [
        { name: 'Super Bass-O-Matic 1976' },
        { name: 'Jam Hawkers' },
        { name: 'HiberNol' },
        { name: 'Colon Blow' },
    ];

    var typeahead = new Autocomplete(queryset);
    var autocompleteService = new AutocompleteService();
    return Mn.View.extend({

        template: _.template(tpl),
        ui: {
            search: '#search',
        },
        regions: {
            autocplRegion: '#autocomplete'
        },
        events: {
            'click @ui.search': 'search',
        },
        search: function () {
            typeahead.setElement('#autocomplete').render();
            autocompleteService.searchForPlace();
        },

    })
})