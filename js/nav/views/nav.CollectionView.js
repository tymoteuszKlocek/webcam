define([
    'marionette',
    'templates',
    'nav/collections/nav.Collection'
], function (Mn, tpl, Collection) {
    'use strict';

    var collection = new Collection([
        {
            title: 'Finder1',
            url: '#/finder',
            active: true
        },
        {
            title: 'Localisation',
            url: '#/localisation',
        },
        {
            title: 'List',
            url: '#/list'
        }
    ]);
    return Mn.View.extend({
        collection: collection,
        template: _.template(tpl.nav)
    });
});