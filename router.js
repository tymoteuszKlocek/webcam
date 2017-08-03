define([
    'backbone',
    'marionette',
    'appView/scanner/scanner.View',
    'appView/webcams-list/list.View',
    'appView/map/localWebcams.View',
    'appView/common/localisation/localisation.Service'
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
            filterChannel.request('filterState', new Scanner({ mode: mode, params: params }));
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
            position = localisationService.getLocalisation();
        }
    });

});