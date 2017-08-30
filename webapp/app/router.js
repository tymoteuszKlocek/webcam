define([
    'backbone',
    'marionette',
    'app/scanner/scanner.View',
    'app/webcams-list/list.View',
    'app/map/localWebcams.View',
    'app/webcam-collections-dashboard/dashbord.View',
    'app/auth',
    'app/login/login.View'
], function (Bb, Mn, Scanner, List, LocalMapView, CollectionsDashboard, Auth, Login) {
    'use strict';

    return Mn.AppRouter.extend({

        routes: {

            // private routes
            'scanner': 'showScanner',
            'scanner/:mode/:*filter': 'useScanner',
            'list-of-my-webcams': 'showMyList',
            'map/:*position':'showMeOnMap',
            'show-map/:*position/:*country': 'showWebcamOnMap',
            '/#/*default': 'showScanner',
            'list-of-my-collections': 'showCollectionsDashboard',
            
            // public routes
            'login': 'showLogin'
        },

        initialize: function () {
            this.filterChannel = Bb.Radio.channel('filter');
            this.auth = Auth;
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
            };
            console.log(this.logged)
            var f = function() {
                if (this.logged !== true) {
                    this.navigate('#/login');
                    return;
                }
                callback.apply(router, arguments);
            };
            return Bb.Router.prototype.route.call(this, route, name, f);
        }
    });

});