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
    'appView/scanner/autocomplete/autocomplete.View',
    'appView/scanner/autocomplete/typeahead.View.js',
    'typeahead',
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamColView, WebcamModel, SearchWebcamSession, LocalisationService, AutocompleteView, Typeahead) {
    'use strict';

    var searchWebcamSession = new SearchWebcamSession();
    var localisationService = new LocalisationService();
    var itemTemplate = '<a href="#/scanner/country/:<%- code %>"><strong><%- name %></strong> (<%- code %>)</a>';
    var typeahead = new Typeahead({ key: 'name', itemTemplate: itemTemplate });

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
            'click @ui.search1': 'search',
            'mouseover @ui.input': 'showAutocomplete',
        },
        initialize: function (obj) {

            var self = this;
            this.model.set('size', 0);
            localisationService.getLocalisation().then(function (response) {
                self.model.set('position', response);
            });

            if (Object.getOwnPropertyNames(obj).length > 0) {
                switch (obj.mode) {
                    case 'near':
                        var category = 'nearby='
                        this.sendRequest(category, obj.params);
                        break;
                    case 'tag':
                        var category = 'category='
                        this.sendRequest(category, obj.params);
                        break;
                    case 'country':
                        var category = 'country=';
                        this.sendRequest(category, obj.params);
                        break;
                    default:
                        break;
                }
            }
        },

        onRender: function () {
            this.showChildView('autocplRegion', new AutocompleteView());
            console.log(this.model.get('size'));
        },

        populate: function (webcamCol) {
            if (webcamCol) {
                this.model.set('size', webcamCol.size());
                var webcamColView = new WebcamColView({ collection: webcamCol, state: 'scanner' });
                this.showChildView('webcamRegion', webcamColView);
            } else {

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

        showAutocomplete: function () {
            typeahead.setElement('#autocomplete').render();
        },

    });
});

