define([
    'backbone',
    'marionette',
    'appView/appView',
    'appView/scanner/scanner.View',
    'router'
], function (Bb, Mn, AppView, Scanner, Router) {
    'use strict';

    var filterChannel = Bb.Radio.channel('filter');

    var App = new Mn.Application({
        region: '#app-container',
        
        onStart: function () {

            var router = new Router();
            var scanner = new Scanner();

            this.appView = new AppView();
            this.appView.showChildView('main', scanner);
            this.showView(this.appView);

            filterChannel.reply('filterState', function (view) {
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