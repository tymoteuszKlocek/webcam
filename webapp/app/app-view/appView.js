define([
    'marionette',
    'text!app/app-view/appView.html',
    'app/nav/nav.View',
], function (Mn, tpl, Nav) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),

        className: 'appView',

        regions: {
            nav: {
                el: '#nav',
                replaceElement: true
            },
            main: {
                el: '#main',
                replaceElement: true
            },
        },
        
        ui: {
            backTop: '.top-link',
        },

        events: {
            'click @ui.backTop': 'animateBackBtn',
        },

        onRender: function () {
            this.showChildView('nav', new Nav());
        },

        animateBackBtn: function () {
            $('html,body').animate({ scrollTop: 0 }, 'slow');
        },

        templateContext: function () {

            var time = new Date();

            return {
                time: time.toISOString().substring(0, 10),
            };
        },

    });
});
