define([
    'marionette',
    'text!appView/appView.html',
    'appView/nav/nav.View',
    'appView/scanner/scanner.View',
    'appView/webcams-list/list.View',
    'appView/map/localWebcams.View',
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
        
        onRender: function () {
            this.showChildView('nav', new Nav());
        }
    });
});