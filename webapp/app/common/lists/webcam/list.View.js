define([
    'marionette',
    'backbone',
    'text!app/webcams-list/list.View.html',
    'app/common/webcam/webcam.Model',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.CollectionView',
], function (Mn, Bb, tpl, WebcamModel, WebcamCol, WebcamColView) {
    'use strict';

    return Mn.View.extend({
        
        template: _.template(tpl),

        regions: {
            list: '#list'
        },

        ui: {
            sortByCountry: '#sortByCountry',
            sortByCity: '#sortByCity',
            sortByMostPop: '#sortByMostPop',
            sortByLessPop: '#sortByLessPop'
        },

        events: {
            'click @ui.sortByCountry': 'sort',
            'click @ui.sortByCity': 'sort',
            'click @ui.sortByMostPop': 'sort',
            'click @ui.sortByLessPop': 'sort'
        },

        initialize: function (opt) {
            var self = this;
            
            this.webcamModel = new WebcamModel();
            this.webcamModel.getCollection(opt.collectionID).done(function(resp) {
                
                self.collection = new WebcamCol(resp);
                self.displayColView();
            });
        },

        displayColView: function () {
            this.showChildView('list', new WebcamColView({ collection: this.collection, type: 'list' }));
        },

        sort: function (e) {
            var sortedCol;
            var arr = this.collection.sortBy(function (webcam) {
                return webcam.get(e.target.value);
            });
            if (e.target.id === 'sortByMostPop') {
                sortedCol = new WebcamCol(arr.reverse());
            } else {
                sortedCol = new WebcamCol(arr);
            }
            this.showChildView('list', new WebcamColView({ collection: sortedCol, type: 'list' }));
        }

    });
});