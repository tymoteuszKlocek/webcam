define([
    'marionette',
    'text!app/appView/appView.html',
    'app/appView/nav/nav.View',
    'app/appView/scanner/scanner.View',
    'app/appView/webcams-list/list.View',
    'app/appView/map/localWebcams.View',
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