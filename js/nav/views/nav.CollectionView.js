define([
    'marionette',
    'underscore',
    'text!templates/nav.html',
    'nav/collections/nav.Collection',
    'nav/models/nav.Model'
], function (Mn, _, tpl, Collection, Model) {
    'use strict';

    var collection = new Collection([
        {
            title: 'Finder2',
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
        template: tpl
    });
});