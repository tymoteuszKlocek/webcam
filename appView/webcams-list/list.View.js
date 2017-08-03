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

        initialize: function () {

            var fetchedModel = new WebcamModel();

            fetchedModel.fetch({

                success: function (col) {
                    var arr = [];
                    var self = this;

                    _.each(col.attributes, function (model) {
                        if (typeof model === 'object') {
                            console.log('model', model)
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
        }
    })
});