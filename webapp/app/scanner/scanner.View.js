define([
    'backbone',
    'marionette',
    'text!app/scanner/scanner.View.html',
    'app/scanner/scanner.Model',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.CollectionView',
    'app/common/webcam/webcam.Model',
    'app/common/search-webcam-session/searchWebcamCollection',
    'app/common/localisation/localisation.Service',
    'app/scanner/autocomplete/autocomplete.View',
    'app/scanner/autocomplete/countries.Collection',
    'typeahead',
    'text!app/scanner/autocomplete/itemTemplate.html'
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamColView, WebcamModel, SearchWebcamCol, LocalisationService, AutocompleteView, CountryCollection, Typeahead, itemTemplate) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),
        template: _.template(tpl),
        ui: {
            tagName: '#tagName',
            findMe: '#findMe',
            input: '#autocomplet-input',
        },
        regions: {
            webcamRegion: '#webcam-collection',
            autocplRegion: '#autocomplete',
        },
        modelEvents: {
            'change': 'render'
        },
        events: {
            'mouseover @ui.input': 'showAutocomplete',
            'click li': 'showAutocomplete'
        },
        initialize: function (options) {

            var self = this;
            this.searchWebcamCol = new SearchWebcamCol();
            this.localisationService = new LocalisationService();
            this.countryCollection = new CountryCollection();
            this.countryCollection.fetch();
            this.typeahead = new Bb.Typeahead({ collection: this.countryCollection, key: 'name', itemTemplate: itemTemplate });
            this.model.set('size', 0);
            this.localisationService.getLocalisation().then(function (response) {
                self.model.set('position', response);
            });

            if (_.keys(options).length > 0) {
                switch (options.mode) {
                case 'near':
                    var category = 'nearby=';
                    this.sendRequest(category, options.params);
                    break;
                case 'tag':
                    category = 'category=';
                    this.sendRequest(category, options.params);
                    break;
                case 'country':
                    category = 'country=';
                    this.sendRequest(category, options.params);
                    break;
                default:
                    break;
                }
            }
        },

        onRender: function () {
            this.showChildView('autocplRegion', new AutocompleteView());
            this.typeahead.setElement('#autocomplete').render();
        },

        sendRequest: function (category, position) {
            var self = this;

            this.searchWebcamCol.fetch(category, position).done(function (data) {
                self.webcamCol = new WebcamCol(data.result);
                self.model.set('size', data.result.length);
                self.webcamColView = new WebcamColView({ collection: self.webcamCol, type: 'scanner' });
                self.showChildView('webcamRegion', self.webcamColView);
            });
        },

        showAutocomplete: function () {
            this.typeahead.setElement('#autocomplete').render();
        },

    });
});

