define([
    'marionette',
    'backbone',
    'text!appView/webcams-list/list.View.html',
    'appView/common/webcam/webcam.Collection',
    'appView/common/webcam/webcam.CollectionView',
    'appView/common/webcam/webcam.Model',
], function (Mn, Bb, tpl, WebcamCol, WebcamColView, WebcamModel) {
    'use strict';

    var savedCollection;
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
            var fetchedModel = new WebcamModel();

            fetchedModel.fetch({
                success: function (col) {
                    var arr = [];
                    var self = this;
                    _.each(col.attributes, function (model) {
                        if (typeof model === 'object') {
                            model.state = "list";
                            arr.push(model);
                        }
                    })
                    savedCollection = new WebcamCol(arr);
                },

                error: function (error, m) {
                    console.log('fetched collection error', error, m);
                }
            });
        },

        onRender: function () {
            this.showChildView('list', new WebcamColView({ collection: savedCollection }));
        },

        sort: function (e) {
            var sortedCol;
            var arr = savedCollection.sortBy(function (webcam) {
                return webcam.get(e.target.value);
            });

            if (e.target.id === 'sortByMostPop') {
                sortedCol = new WebcamCol(arr.reverse());
            } else {
                sortedCol = new WebcamCol(arr);
            }
            this.showChildView('list', new WebcamColView({ collection: sortedCol }));
        }

    })
});