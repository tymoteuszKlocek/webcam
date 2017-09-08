define([
    'backbone',
    'marionette',
    'app/dashboard/dashboard.View',
    'app/scanner/scanner.View',
    'app/common/lists/webcam/list.View',
    'app/map/localWebcams.View',
    'app/auth',
    'app/login/login.View'
], function (Bb, Mn, Dashboard, Scanner, WebcamsListView, LocalMapView, Auth, Login) {
    'use strict';

    return Mn.AppRouter.extend({

        routes: {

            // private routes
            'dashboard': 'showDashboard',
            'dashboard/:id': 'showMyList',
            'scanner': 'showScanner',
            'scanner/:mode/:*filter': 'useScanner',
            'map/:*position':'showMeOnMap',
            'show-map/:*position/:*country': 'showWebcamOnMap',
            
            // public routes
            'login': 'showLogin'
        },

        initialize: function () {
            this.filterChannel = Bb.Radio.channel('filter');
            this.accessChannel = Bb.Radio.channel('access');
            this.auth = Auth;
        },

        showDashboard: function() {
            this.filterChannel.request('filterState', new Dashboard());
        },

        showScanner: function () {
            this.filterChannel.request('filterState', new Scanner());
        },

        useScanner: function (mode, params) {
            this.filterChannel.request('filterState', new Scanner({ mode: mode, params: params }));
        },

        showMyList: function (collectionID) {
            this.filterChannel.request('filterState', new WebcamsListView({collectionID: collectionID}));
        },

        showMeOnMap: function (position) {
            this.filterChannel.request('filterState', new LocalMapView({ position: position, country: 'Poland' }));
        },

        showWebcamOnMap: function (position, country) {
            this.filterChannel.request('filterState', new LocalMapView({ position: position, country: country }));
        },

        showLogin: function () {
            this.filterChannel.request('filterState', new Login());
        },

        // checks authorisation for routes
        route: function(route, name, callback) {
            var router = this;
            
            if (!callback) { 
                callback = this[name];
            }

            var f = function() {
                var logged = Auth.get('logged');
                if (logged !== true) {
                    router.accessChannel.trigger('access:denied');
                    return;
                }
                callback.apply(router, arguments);
            };

            return Mn.AppRouter.prototype.route.call(this, route, name, f);
        }
    });

});