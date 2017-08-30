define([
    'backbone',
    'marionette',
    'app/scanner/scanner.View',
    'app/webcams-list/list.View',
    'app/map/localWebcams.View',
    'app/common/localisation/localisation.Service',
    'app/login/login.View',
    'app/webcam-collections-dashboard/dashbord.View',
    'app/controller/sessionCtrl'
], function (Bb, Mn, Scanner, List, LocalMapView, LocalisationService, Login, CollectionsDashboard, Session) {
    'use strict';

    //var filterChannel = Bb.Radio.channel('filter');

    // var AuthCtrl = {

    //     initialize: function () {

    //         this.sessionID = this.session.model.get('user');
    //         this.filterChannel = Bb.Radio.channel('filter');
    //         this.session = new Session();
    //         this.logged = this.session.getAuth()
    //         //this.session.getAuth();
    //         console.log('ctrl', this.session.model.get('user'))
    //         this.checkAuth();
    //     },
    //     getAuthorised: function() {
    //         console.log('ctrl works')
    //     },

    //     showScanner: function () {
    //         this.checkAuth();
    //         filterChannel.request('filterState', new Scanner());
    //     },

    //     useScanner: function (mode, params) {
    //         filterChannel.request('filterState', new Scanner({ mode: mode, params: params }));
    //     },

    //     showMyList: function () {
    //         filterChannel.request('filterState', new List());
    //     },

    //     showMeOnMap: function (position) {
    //         filterChannel.request('filterState', new LocalMapView({ position: position, country: "Poland" }));
    //     },

    //     showWebcamOnMap: function (position, country) {
    //         filterChannel.request('filterState', new LocalMapView({ position: position, country: country }));
    //     },

    //     showLogin: function() {
    //         filterChannel.request('filterState', new Login());
    //     },

    //     showCollectionsDashboard: function() {
    //         filterChannel.request('filterState', new CollectionsDashboard());
    //     },

    //     onRoute: function(n,p,a) {
    //         console.log(1, n, 2, p, 3, a)
    //     }
    // }

    return Mn.AppRouter.extend({

        //controller: AuthCtrl,
        routes: {
            'scanner': 'showScanner',
            'scanner/:mode/:*filter': 'useScanner',
            'list-of-my-webcams': 'showMyList',
            'map/:*position': 'showMeOnMap',
            'show-map/:*position/:*country': 'showWebcamOnMap',
            '/#/*default': 'showScanner',
            'login': 'showLogin',
            'list-of-my-collections': 'showCollectionsDashboard'
        },

        initialize: function (opt) {
            this.filterChannel = Bb.Radio.channel('filter');
            this.session = opt;
            this.logged = this.session.get('sessionID');
            this.test = 2;
            console.log('this.session in router', opt)
        },

        checkAuth: function () {
            //this.logged = this.session.get('sessionID');
            console.log('logged', this.logged, this.test)
            if (this.logged === undefined) {
                this.navigate('#/login')
            }
            return true;
        },

        showScanner: function () {
            this.session.getAuth(this.filterChannel.request('filterState', new Scanner()));
            // if(this.checkAuth()){
            //     this.filterChannel.request('filterState', new Scanner());
            //     console.log('this.session in router', this.session)
            // }
        },

        useScanner: function (mode, params) {
            this.filterChannel.request('filterState', new Scanner({ mode: mode, params: params }));
        },

        showMyList: function () {
            //this.logged = this.session.get('sessionID');
            //console.log(this.logged)
            //this.session.get('sessionID', resp.sessionID);
            this.filterChannel.request('filterState', new List());
        },

        showMeOnMap: function (position) {
            this.filterChannel.request('filterState', new LocalMapView({ position: position, country: "Poland" }));
        },

        showWebcamOnMap: function (position, country) {
            this.filterChannel.request('filterState', new LocalMapView({ position: position, country: country }));
        },

        showLogin: function () {
            this.filterChannel.request('filterState', new Login(this.session));
            //this.filterChannel.request('login');
        },

        showCollectionsDashboard: function () {
            this.filterChannel.request('filterState', new CollectionsDashboard());
        },

        // onRoute: function(n,p,a) {
        //     console.log(1, n, 2, p, 3, a)
        //     return this.filterChannel.request('filterState', new Login());
        // }
    });

});