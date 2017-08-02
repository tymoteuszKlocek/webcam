define([
    'backbone',
    'marionette',
    'app/appView/appView',
    'app/appView/scanner/scanner.View',
    'router'
], function (Bb, Mn, AppView, Scanner, Router) {
    'use strict';

    var filterChannel = Bb.Radio.channel('filter');
    var App = new Mn.Application({
        region: '#app-container',
        onStart: function (options) {
            var router = new Router(options);
            this.appView = new AppView();
            var scanner = new Scanner();
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