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
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamColView, WebcamModel, SearchWebcamSession, LocalisationService, Autocomplete) {
    'use strict';

    var searchWebcamSession = new SearchWebcamSession();
    var localisationService = new LocalisationService();
    var newCollection = [];
    var webcamCol;

    return Mn.View.extend({

        model: new Model(),

        template: _.template(tpl),

        ui: {
            search: '#search',
            query: '#query',
            tagName: '#tagName',
            findMe: '#findMe'
        },

        regions: {
            webcamRegion: '#webcam-collection',
            autocplRegion: '#autocomplete'
        },

        events: {
            'click @ui.search': 'search',
            'click @ui.tagName': 'useTagName',
            'keypress @ui.query': 'checkKeyPress',
            'click @ui.findMe': 'useMyLocation',
        },

        search: function () {
            Bb.history.navigate('scanner/:country/:' + this.ui.query.val().trim());
            this.useCountry(this.ui.query.val().trim());
        },

        useTagName: function (str) {
            var category = 'category='

            this.sendRequest(category, str);
        },

        useCountry: function (countryCode) {
            var category = 'country=';

            this.sendRequest(category, countryCode);
        },

        useMyLocation: function () {
            var category = 'nearby=';
            var position = localisationService.getLocalisation();

            this.sendRequest(category, position);
        },

        populate: function (webcamCol) { //works but...
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

        sendRequest: function(category, position) {
            var self = this;

            searchWebcamSession.searchForWebcam(category, position).then(function (resp) {
                return self.createModel(resp);
            }).then(function (newCollection) {
                return new WebcamCol(newCollection);
            }).then(function (webcamCol) {
                self.populate(webcamCol);
            });
        },

        checkKeyPress: function (e) {
            var ENTER = 13;
            var queryTxt = this.ui.query.val().trim();

            this.model.set('query', queryTxt);

            if (e.which === ENTER) {
                this.search();
            }
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
            this.showChildView('autocplRegion', new Autocomplete());
        }
    })
})