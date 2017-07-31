define([
    'backbone',
    'marionette',
    'app/appView/appView',
    'app/appView/scanner/scanner.View',
    'app/appView/webcams-list/list.View',
    'app/appView/local-webcams/localWebcams.View',
], function (Bb, Mn, AppView, Scanner, List, LocalView) {
    'use strict';

    var filterChannel = Bb.Radio.channel('filter');
    return Mn.AppRouter.extend({
        routes: {
            '': 'showScanner',
            'scanner': 'showScanner',
            'scanner/find-near-me/:*filter': 'showNearMe',
            'scanner/tag/:*filter': 'showByTag',
            'scanner/country/:*filter': 'showByCountry',
            'list-of-webcams': 'showList',
            'localisation': 'showLocalMap',
            'show-map/:*webcamId': 'showOnMap',
            '/scanner/*tag': 'showScanner',
            //'*path': 'showScanner',
        },
        showScanner: function () {
            filterChannel.request('filterState', new Scanner());
        },
        showNearMe: function (params) {
             filterChannel.request('filterState', new Scanner({ params: params, mode: 2 }));
        },
        showByTag: function (params) {
             filterChannel.request('filterState', new Scanner({ params: params, mode: 1 }));
        },
        showByCountry: function (params) {
            filterChannel.request('filterState', new Scanner({ params: params, mode: 3 }));
        },
        showList: function () {
            filterChannel.request('filterState', new List());
        },
        showLocalMap: function () {
            var localView = new LocalView();
            localView.render();
            filterChannel.request('filterState', localView);
        },
        showOnMap: function (params) {
            filterChannel.request('filterState', new LocalView({ params: params }));
        },
        onRoute: function (name, path, args) {
            console.log('User navigated to ' + path, 'name: ', name, 'args:', args);
        }

    });

    // router to be fixed

});