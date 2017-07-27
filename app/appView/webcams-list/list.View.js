define([
    'marionette',
    'backbone',
    'text!app/appView/webcams-list/list.View.html',
    'app/appView/common/webcam/webcam.Collection',
    'app/appView/common/webcam/webcam.CollectionView',
    'app/appView/common/webcam/webcam.Model',
], function (Mn, Bb, tpl, WebcamCol, WebcamColView, WebcamModel) {
    'use strict';

    var webcamChannel = Bb.Radio.channel('buttonDisplay');
    
    return Mn.View.extend({
        template: _.template(tpl),
        regions: {
            list: '#list'
        },
        onRender: function () {
            var savedCollection;
            var fetchedModel = new WebcamModel();
            fetchedModel.fetch({
                success: function (col) {
                    // this is going to be strange, is there other way?
                    var arr = [];
                    _.each(col.attributes, function (model) {
                        if (typeof model === 'object') {
                            arr.push(model);
                        }
                    })
                    savedCollection = new WebcamCol(arr);
                },
                error: function (error) {
                    console.log('fetched collection error', error);
                }
            });
            this.showChildView('list', new WebcamColView({ collection: savedCollection, test: 12 }));
            webcamChannel.trigger('change:state', 'list');
        }
    })
});