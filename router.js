define([
    'backbone',
    'marionette',
    'app/appView/scanner/scanner.View',
    'app/appView/webcams-list/list.View',
    'app/appView/map/localWebcams.View',
    'app/appView/common/localisation/localisation.Service'
], function (Bb, Mn, Scanner, List, LocalMapView, LocalisationService) {
    'use strict';

    var filterChannel = Bb.Radio.channel('filter');
    var localisationService = new LocalisationService();
    var position;
    return Mn.AppRouter.extend({
        routes: {
            '': 'showScanner',
            'scanner': 'showScanner',
            'scanner/:mode/:*filter': 'useScanner',
            'list-of-my-webcams': 'showMyList',
            'localisation': 'showMeOnMap',
            'show-map/:*position': 'showWebcamOnMap',
            '*path': 'showScanner',
        },
        showScanner: function () {
            filterChannel.request('filterState', new Scanner());
        },
        useScanner: function (mode, params) {
            var scanner = new Scanner({ mode: mode, params: params });
            filterChannel.request('filterState', scanner);
        },
        showMyList: function () {
            filterChannel.request('filterState', new List());
        },
        showMeOnMap: function () {
            position = localisationService.getLocalisation();
            filterChannel.request('filterState', new LocalMapView({ position: position }));
        },
        showWebcamOnMap: function (position) {
            filterChannel.request('filterState', new LocalMapView({ position: position }));
        },
        initialize: function () {
            position = localisationService.getLocalisation(); // check where should this go
        }
    });

});