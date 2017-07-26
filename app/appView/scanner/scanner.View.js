define([
    'marionette',
    'text!app/appView/scanner/scanner.View.html',
    'app/appView/common/webcam/webcam.CollectionView',
    'app/appView/common/webcam/webcam.Model',
], function (Mn, tpl, WebcamCol, WebcamModel, Store) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),
        ui: {
            search: '#search',
            input: '#webcam-title'
        },
        regions: {
            webcamRegion: '#webcam-collection'
        },
        events: {
            'click @ui.search': 'search'
        },
        search: function () {
            //TODO REST request for https://www.webcams.travel/api/#api here!
            //collection of webcams from Internet
            //at the moment fake collection used

            // example: https://webcamstravel.p.mashape.com/webcams/list/category={category}
            this.showChildView('webcamRegion', new WebcamCol())
        }
    })
})