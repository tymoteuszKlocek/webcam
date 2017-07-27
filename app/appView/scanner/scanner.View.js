define([
    'backbone',
    'marionette',
    'text!app/appView/scanner/scanner.View.html',
    'app/appView/scanner/scanner.Model',
    'app/appView/common/webcam/webcam.Collection',
    'app/appView/common/webcam/webcam.CollectionView',
    'app/appView/common/webcam/webcam.Model',
    'app/appView/scanner/session'
], function (Bb, Mn, tpl, Model, WebcamCol, WebcamColView, WebcamModel, Session) {
    'use strict';


    var webcamChannel = Bb.Radio.channel('buttonDisplay');
    var webcamCol;
    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),
        ui: {
            search: '#search',
            query: '#query',
            tagName: '#tagName'
        },
        regions: {
            webcamRegion: '#webcam-collection'
        },
        events: {
            'click @ui.search': 'search',
            'click @ui.tagName': 'useTagName'
        },
        search: function () {
            var session = new Session();
            var query = this.ui.query.val().trim();
            var newCollection = [];
            var self = this;//well...?
            session.sendQuery(query).then(function (resp) {
                _.each(resp.result.webcams, function (obj) {
                    var newModel = {};
                    newModel.thumbnail = obj.image.current.preview || '';
                    newModel.title = obj.title || 'name unknown';
                    newModel.url = obj.url.current.desktop || '';
                    newCollection.push(newModel);
                })
                webcamCol = new WebcamCol(newCollection);
            }).then(function () {
                self.populate();
            });
        },
        populate: function () {
            this.showChildView('webcamRegion', new WebcamColView({ collection: webcamCol }));
            webcamChannel.trigger('change:state', 'scanner');
        },
        useTagName: function(e) {
            this.ui.query.val(e.target.outerText);
        }
    })
})