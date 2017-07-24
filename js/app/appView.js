define([
    'marionette',
    'text!app/app.html',
    'nav/nav.CollectionView',
    'place-finder/PlaceFinder.View',
    'dialog/dialog.View'
], function (Mn, tpl, Nav, Finder, Dialog) {
    'use strict';

    var renderChannel = Backbone.Radio.channel('renderView');

    return Mn.View.extend({
        template: _.template(tpl),
        className: 'app-view',
        regions: {
            nav: {
                el: '#nav',
                replaceElement: true
            },
            finder: '#finder',
            main: {
                el: '#main',
                replaceElement: true
            },
            dialog: '#dialog'
        },
        childViewEvents: {
            'open:Dialog': 'openDialog',
            'hide:dialog': 'hideDialog'
        },
        onRender: function () {
            this.showChildView('nav', new Nav());
        },
        openDialog: function() {
            this.detachChildView('finder');
            console.log('yes from appVei')
            this.showChildView('dialog', new Dialog());
        },
        hideDialog: function() {
            this.detachChildView('dialog');
            this.showChildView('finder', new Finder());
        },
        onChildViewOpenDialog: function() {
            console.log('yes32323 from appVei')
        }
    });
});