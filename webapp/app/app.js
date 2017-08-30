define([
    'backbone',
    'marionette',
    'app/landing-page/landingPage.View',
    'app/login/login.View',
    'app/appView/appView',
    'app/scanner/scanner.View',
    'app/router',
    'app/auth',
    'css!app/css/style',
    'css!node_modules/bootstrap/dist/css/bootstrap.min.css'
], function (Bb, Mn, LandingPage, Login, AppView, Scanner, Router, Auth) {
    'use strict';

    var App = new Mn.Application({
        region: '#app-container',
        
        onStart: function () {

            this.filterChannel = Bb.Radio.channel('filter');
            this.auth = new Auth();
            this.router = new Router(this.auth);
            this.landingPage = new LandingPage();
            this.login = new Login(this.auth);
            this.appView = new AppView();
            var self = this;
            this.showView(this.landingPage);
            this.auth.getAuth();
            this.filterChannel.reply('filterState', function (view) {
                App.appView.showChildView('main', view);
                App.showView(App.appView);
            });

            this.filterChannel.reply('access ok', function () {
                App.appView.showChildView('main', new Scanner(this.session));
                App.showView(App.appView);
            });

            this.filterChannel.reply('login', function () {
                App.showView(App.login);
            });

            if (Backbone.history) {
                Backbone.history.start();
            }
        },
    });
    return window.app = App;
});