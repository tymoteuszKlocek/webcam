define([
    'marionette',
    'backbone',
    'text!app/webcams-list/list.View.html',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.CollectionView',
    'app/common/webcam/webcam.Model',
], function (Mn, Bb, tpl, WebcamCol, WebcamColView, WebcamModel) {
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
   
        initialize: function () {
            // work in progress unknown issue with fetching data from localStorage
            var self = this;
            this.model = new WebcamModel();
            this.model.fetch().done(function(data){
                self.collection = new WebcamCol(data);
                self.displayColView();
            });
            // this.collection = new WebcamCol({id: 1});
            // this.collection.fetch().done(function (data) {
            //     console.log('fdata', data)
            //     self.displayColView();
            // });
        },

        onRender: function () {
            this.showChildView('list', new WebcamColView({ collection: this.collection, type: 'list' }));
        },

        displayColView: function() {
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

    })
});