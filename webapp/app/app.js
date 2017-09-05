define([
    'backbone',
    'marionette',
    'app/landing-page/landingPage.View',
    'app/login/login.View',
    'app/app-view/appView',
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
            this.accessChannel = Bb.Radio.channel('access');
            this.auth = Auth;
            this.router = new Router();
            this.landingPage = new LandingPage();
            this.appView = new AppView();
            this.scanner = new Scanner();

            this.showView(this.landingPage);

            this.filterChannel.reply('filterState', function (view) {
                App.appView.showChildView('main', view);
                App.showView(App.appView);
            });

            this.accessChannel.on('access:denied', function () {
                App.router.navigate('#/login');
                App.showView(new Login());
            });

            this.accessChannel.on('access:allowed', function () {
                App.router.navigate('#/scanner');
            });

            if (Bb.history) {
                Bb.history.start();
            }
        },
    });
    return window.app = App;
});