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
            'change': 'render'
        },
        search: function () {
            this.model.set('query', this.ui.query.val().trim());
           
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
            session.searchNearBy(position).then(function (resp) {
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
                var newModel = {};
                newModel.id = obj.id;
                newModel.city = obj.location.city;
                newModel.country = obj.location.country;
                newModel.countryCode = obj.location.country_code;
                newModel.views = obj.statistics.views;
                newModel.lat = obj.location.latitude;
                newModel.lng = obj.location.longitude;
                newModel.position = obj.location.latitude.toFixed(3) + ',' + obj.location.longitude.toFixed(3);
                newModel.thumbnail = obj.image.current.preview || '';
                newModel.state = 'scanner';
                newModel.title = obj.title || 'name unknown';
                newModel.url = obj.url.current.desktop || '';
                arr.push(newModel);
            });
            return arr
        },
        checkKeyPress: function (e) {
            // var ENTER = 13;
            // if (e.which === ENTER) {
            //     this.search();
            // } 
            //     this.model.set('query', this.ui.query.val().trim());
            //     console.log('to wpisałeś:', this.ui.query.val().trim());
            
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