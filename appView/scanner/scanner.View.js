define([
    'backbone',
    'marionette',
    'text!appView/scanner/scanner.View.html',
    'appView/scanner/scanner.Model',
    'appView/common/webcam/webcam.Collection',
    'appView/common/webcam/webcam.CollectionView',
    'appView/common/webcam/webcam.Model',
    'appView/common/search-webcam-session/searchWebcamSession',
    'appView/common/localisation/localisation.Service',
    'appView/scanner/autocomplete-country-city/autocomplete.View',
    'appView/scanner/autocomplete-country-city/typeahead.View.js',
    'typeahead',
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamColView, WebcamModel, SearchWebcamSession, LocalisationService, AutocompleteView, Typeahead) {
    'use strict';

    var searchWebcamSession = new SearchWebcamSession();
    var localisationService = new LocalisationService();
    var itemTemplate = '<a href="#/scanner/country/:<%- code %>"><strong><%- name %></strong> (<%- code %>)</a>';
    var typeahead = new Typeahead({key: 'name',itemTemplate: itemTemplate});
    
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
        events: {
            'click @ui.search1': 'search',
            'mouseover @ui.findMe': 'checkPosition',
            'mouseover @ui.input': 'showAutocomplete',
        },

        useTagName: function (str) {
            var category = 'category='

            this.sendRequest(category, str);
        },

        useCountry: function (str) {
            var category = 'country=';
 
            this.sendRequest(category, str);
        },

        useMyLocation: function () {
            var category = 'nearby=';
            var position = localisationService.getLocalisation();

            this.sendRequest(category, position);
        },

        populate: function (webcamCol) {
            if (webcamCol) {
                var webcamColView = new WebcamColView({ collection: webcamCol, state: 'scanner' }) //check it - what is wrong?? error: Uncaught (in promise) TypeError: Cannot read property 'show' of undefined
                this.showChildView('webcamRegion', webcamColView);
            }
        },

        createModel: function (resp) {
            var arr = [];

            _.each(resp.result.webcams, function (obj) {
                var newModel = new WebcamModel({
                    id: obj.id,
                    city: obj.location.city,
                    country: obj.location.country,
                    countryCode: obj.location.country_code,
                    views: obj.statistics.views,
                    lat: obj.location.latitude,
                    lng: obj.location.longitude,
                    position: obj.location.latitude.toFixed(3) + ',' + obj.location.longitude.toFixed(3),
                    thumbnail: obj.image.current.preview || '',
                    state: 'scanner',
                    title: obj.title || 'name unknown',
                    link: obj.url.current.desktop || ''
                });
                arr.push(newModel);
            });
            return arr
        },

        sendRequest: function (category, position) {
            var self = this;

            searchWebcamSession.searchForWebcam(category, position).then(function (resp) {
                return self.createModel(resp);
            }).then(function (newCollection) {
                return new WebcamCol(newCollection);
            }).then(function (webcamCol) {
                self.populate(webcamCol);
            });
        },

        checkPosition: function () {
            var position = localisationService.getLocalisation();
            this.model.set('position', position);
        },

        showAutocomplete: function() {           
            typeahead.setElement('#autocomplete').render();
        },

        onBeforeRender: function (view) {
            var position = localisationService.getLocalisation();
            this.model.set('position', position);

            if (Object.getOwnPropertyNames(view).length > 0) {
                switch (view.options.mode) {
                    case 'near':
                        this.useMyLocation(view.options.params);
                        break;
                    case 'tag':
                        this.useTagName(view.options.params)
                        break;
                    case 'country':
                        this.useCountry(view.options.params);
                        break;
                    default:
                        break;
                }
            }
        },

        onRender: function () {
            this.showChildView('autocplRegion', new AutocompleteView());
        },

    });
});

