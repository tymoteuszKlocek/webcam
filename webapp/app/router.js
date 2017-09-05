define([
    'backbone',
    'marionette',
    'app/scanner/scanner.View',
    'app/webcams-list/list.View',
    'app/map/localWebcams.View',
    'app/webcam-collections-dashboard/dashbord.View',
    'app/auth',
    'app/login/login.View'
], function (Bb, Mn, Scanner, WebcamsListView, LocalMapView, CollectionsDashboard, Auth, Login) {
    'use strict';

    return Mn.AppRouter.extend({

        routes: {

            // private routes
            'scanner': 'showScanner',
            'scanner/:mode/:*filter': 'useScanner',
            'list-of-my-webcams': 'showMyList',
            'map/:*position':'showMeOnMap',
            'show-map/:*position/:*country': 'showWebcamOnMap',
            //TODO '/#/*default': 'showScanner',
            'list-of-my-collections': 'showCollectionsDashboard',
            'list-of-my-collections/:collectionID': 'showMyList',
            
            // public routes
            'login': 'showLogin'
        },

        initialize: function () {
            this.filterChannel = Bb.Radio.channel('filter');
            this.accessChannel = Bb.Radio.channel('access');
            this.auth = Auth;
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

        showCollectionsDashboard: function () {
            this.filterChannel.request('filterState', new CollectionsDashboard());
        },

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