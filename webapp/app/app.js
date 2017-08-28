define([
    'backbone',
    'marionette',
    'app/landing-page/landingPage.View',
    'app/appView/appView',
    'app/scanner/scanner.View',
    'app/router',
    'app/auth',
    'css!app/css/style',
    'css!node_modules/bootstrap/dist/css/bootstrap.min.css'
], function (Bb, Mn, LandingPage, AppView, Scanner, Router, Auth) {
    'use strict';

    var App = new Mn.Application({
        region: '#app-container',
        
        onStart: function () {

            this.filterChannel = Bb.Radio.channel('filter');
            this.router = new Router();
            this.auth = new Auth();
            this.landingPage = new LandingPage();
            this.appView = new AppView();

            
            this.showView(this.landingPage);

            this.filterChannel.reply('filterState', function (view) {
                App.appView.showChildView('main', view);
                App.showView(App.appView);
            });

            if (Backbone.history) {
                Backbone.history.start();
            }
        },
    });
    return window.app = App;
});