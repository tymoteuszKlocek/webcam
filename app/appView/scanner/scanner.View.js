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
        search: function () {
            var query = this.ui.query.val().trim();
            var self = this;
            
            //use one of this: 
            //searchWithRegion
            //sendQuery
            //searchNearBy - needs tow params (lat,lng)

            session.sendQuery(query).then(function (resp) {
                newCollection = self.createModel(resp);
                webcamCol = new WebcamCol(newCollection);
            }).then(function () {
                self.populate();
            });
        },
        useTagName: function (e) {
            var self = this;
            session.searchWithTag(e.target.outerText).then(function (resp) {
                webcamCol = new WebcamCol(self.createModel(resp));
            }).then(function () {
                self.populate();
            });
        },
        useMyLocation: function () {
            var self = this;

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
                newModel.id = obj.id,
                    newModel.thumbnail = obj.image.current.preview || '';
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