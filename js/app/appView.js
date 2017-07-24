define([
    'marionette',
    'text!app/app.html',
    'nav/nav.CollectionView',
    'place-finder/PlaceFinder.View',
    'dialog/dialog.View'
], function (Mn, tpl, Nav, Finder, Dialog) {
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
        },
        // childViewEvents: {
        //     'child:title:selected': 'useTitle',
        // },
        // useTitle: function (title) {
        //     console.log('listen to title!!!!!!!!!!:selected', title)
        // },
    });
});