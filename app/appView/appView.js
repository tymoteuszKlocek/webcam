define([
    'marionette',
    'text!app/appView/appView.html',
    'app/nav/nav.View',
    'app/scanner/scanner.View',
    'app/webcams-list/list.View',
    'app/map/localWebcams.View',
    'bootstrap',
], function (Mn, tpl, Nav, Scanner, List, LocalView) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),
        className: 'app-view',
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
            backTop: '#top-link'
        },

        events: {
            'click @ui.backTop': 'animateBackBtn'
        },

        onRender: function () {
            this.showChildView('nav', new Nav());
        },

        animateBackBtn: function() {
            $('html,body').animate({scrollTop:0},'slow');
        }

    });
});

onclick=";"