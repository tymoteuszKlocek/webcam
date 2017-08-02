define([
    'backbone',
    'marionette',
    'text!app/appView/scanner/scanner.View.html',
    'app/appView/scanner/scanner.Model',
    'app/appView/common/webcam/webcam.Collection',
    'app/appView/common/webcam/webcam.CollectionView',
    'app/appView/common/webcam/webcam.Model',
    'app/appView/common/session/session',
    'app/appView/common/localisation/localisation.Service'
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamColView, WebcamModel, Session, LocalisationService) {
    'use strict';

    var session = new Session();
    var localisationService = new LocalisationService();
    var newCollection = [];
    var webcamCol;
    var position;
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
            webcamRegion: '#webcam-collection'
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
            var self = this;
            position = localisationService.getLocalisation();
            session.searchWithTag(str).then(function (resp) {
                webcamCol = new WebcamCol(self.createModel(resp));
            }).then(function () {
                self.populate();
            });
        },
        useCountry: function (countryCode) {
            var self = this;
            session.searchByCountry(countryCode).then(function (resp) {
                webcamCol = new WebcamCol(self.createModel(resp));
            }).then(function () {
                self.populate();
            });
        },
        useMyLocation: function () {
            var self = this;
            session.searchNearBy(localisationService.getLocalisation()).then(function (resp) {
                newCollection = self.createModel(resp);
                webcamCol = new WebcamCol(newCollection);
            }).then(function () {
                self.populate();
            });
        },
        populate: function () {
            this.showChildView('webcamRegion', new WebcamColView({ collection: webcamCol, state: 'scanner' }));
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
        checkKeyPress: function (e) {
            var ENTER = 13;
            var queryTxt = this.ui.query.val().trim();
            this.model.set('query', queryTxt);
            if (e.which === ENTER) {
                this.search();
            }
        },
        onBeforeRender: function (view) {
            position = localisationService.getLocalisation();
            this.model.set('position', position);
            //check this in initailize if works
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
        }
    })
})