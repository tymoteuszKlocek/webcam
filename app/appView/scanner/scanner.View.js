define([
    'backbone',
    'marionette',
    'text!app/appView/scanner/scanner.View.html',
    'app/appView/scanner/scanner.Model',
    'app/appView/common/webcam/webcam.Collection',
    'app/appView/common/webcam/webcam.CollectionView',
    'app/appView/common/webcam/webcam.Model',
    'app/appView/common/session/session'
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamColView, WebcamModel, Session) {
    'use strict';

    var webcamCol;
    var session = new Session();
    var newCollection = [];

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
            'click @ui.findMe': 'useMyLocation'
        },
        initialize: function(params) { 
            console.log('twoje param', params);
            if (Object.getOwnPropertyNames(params).length > 0) {
                if(params.mode === 1) {
                    this.useTagName(params.params)
                } 
                if(params.mode === 2) {
                     this.useMyLocation();
                } 
                if(params.mode === 3) {
                     this.useCountry(params.params);
                } 
            }
        },
        search: function () {
            var query = this.ui.query.val().trim();
            var self = this;
            session.searchByCountry(query).then(function (resp) {
                newCollection = self.createModel(resp);
                webcamCol = new WebcamCol(newCollection);
            }).then(function () {
                self.populate();
            });
        },
        useTagName: function (str) {
            var self = this;
            session.searchWithTag(str).then(function (resp) {
                webcamCol = new WebcamCol(self.createModel(resp));
            }).then(function () {
                self.populate();
            });
        },
        // useTagName: function (e) {
        //     var self = this;
        //     session.searchWithTag(e.target.outerText).then(function (resp) {
        //         webcamCol = new WebcamCol(self.createModel(resp));
        //     }).then(function () {
        //         self.populate();
        //     });
        // },
        useCountry: function(str) {
            console.log('used router', str);
            this.search();
            // var self = this;
            // session.searchByCountry(params.params).then(function (resp) {
            //     webcamCol = new WebcamCol(self.createModel(resp));
            // }).then(function () {
            //     self.populate();
            // });
        },
        useMyLocation: function () {
            var self = this;
            //navigator gets location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var LAT = position.coords.latitude.toFixed(3);
                    var LNG = position.coords.longitude.toFixed(3);
                    session.searchNearBy(LAT, LNG).then(function (resp) {
                        newCollection = self.createModel(resp);
                        webcamCol = new WebcamCol(newCollection);
                    }).then(function () {
                        self.populate();
                    });
                });
            } else {
                alert("I can't use localisation")
            }
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
                newModel.thumbnail = obj.image.current.preview || '';
                newModel.state = 'scanner';
                newModel.title = obj.title || 'name unknown';
                newModel.url = obj.url.current.desktop || '';
                arr.push(newModel);
            });
            return arr
        },
        checkKeyPress: function (e) {
            var ENTER = 13;
            if (e.which === ENTER) {
                this.search();
            }
        }
    })
})