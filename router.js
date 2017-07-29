define([
    'backbone',
    'marionette',
    'app/appView/appView',
    'app/appView/scanner/scanner.View',
    'app/appView/webcams-list/list.View',
    'app/appView/local-webcams/localWebcams.View',
    'app/appView/modal-webcam/modal.View'
], function (Bb, Mn, AppView, Scanner, List, LocalView, WebcamModal) {
    'use strict';

    var filterChannel = Bb.Radio.channel('filter');
    return Mn.AppRouter.extend({
        routes: {
            '': 'showScanner',
            'webcam/:webcamID': 'showWebcam',
            'scanner': 'showScanner',
            'list-of-webcams': 'showList',
            'localisation': 'showLocalView',
            'scanner/find-near-me/:*near': 'showScannerNearMe',
            'scanner/country/:*filter': 'showCountryList',
            'show-map/:*webcamId': 'showOnMap',
            '/scanner/*tag': 'showScanner',
            //'*path': 'showScanner',
        },
        showWebcam: function (webcamID) {
            filterChannel.request('filterState', new WebcamModal({ model: { id: webcamID } }));
        },
        showList: function () {
            filterChannel.request('filterState', new List());
        },
        showLocalView: function () {
            filterChannel.request('filterState', new LocalView());
        },
        showScanner: function () {
            filterChannel.request('filterState', new Scanner());
        },
        showScannerNearMe: function (params) {
            filterChannel.request('filterState', new Scanner());
        },
        showCountryList: function(params) {
            filterChannel.request('filterState', new Scanner({params: params}));
        },
        showOnMap: function(params) {
            filterChannel.request('filterState', new LocalView({params: params}));
        }

    });
});