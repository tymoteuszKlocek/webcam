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
           // 'scanner/*filter': 'showScanner',
            'webcam/:webcamID': 'showWebcam',
            'scanner': 'showScanner',
            'list-of-webcams': 'showList',
            'webcams-near-you': 'showLocalView'
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
        showScannerParam: function (param) {
            console.log('param', param)
            filterChannel.request('filterState', new Scanner());
        }
    });
});