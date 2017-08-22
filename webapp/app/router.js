define([
    'backbone',
    'marionette',
    'app/scanner/scanner.View',
    'app/webcams-list/list.View',
    'app/map/localWebcams.View',
    'app/common/localisation/localisation.Service',
    'app/login/login.View'
], function (Bb, Mn, Scanner, List, LocalMapView, LocalisationService, Login) {
    'use strict';

    return Mn.AppRouter.extend({

        routes: {
            'scanner': 'showScanner',
            'scanner/:mode/:*filter': 'useScanner',
            'list-of-my-webcams': 'showMyList',
            'map/:*position': 'showMeOnMap',
            'show-map/:*position/:*country': 'showWebcamOnMap',
            '/#/*default': 'showScanner',
            'login': 'showLogin'
        },

        initialize: function () {
            this.filterChannel = Bb.Radio.channel('filter');
        },

        showScanner: function () {
            this.filterChannel.request('filterState', new Scanner());
        },

        useScanner: function (mode, params) {
            this.filterChannel.request('filterState', new Scanner({ mode: mode, params: params }));
        },

        showMyList: function () {
            this.filterChannel.request('filterState', new List());
        },

        showMeOnMap: function (position) {
            this.filterChannel.request('filterState', new LocalMapView({ position: position, country: "Poland" }));
        },

        showWebcamOnMap: function (position, country) {
            this.filterChannel.request('filterState', new LocalMapView({ position: position, country: country }));
        },

        showLogin: function() {
            this.filterChannel.request('filterState', new Login());
        }
    });

});