define([
    'marionette',
    'underscore',
    'text!templates/nav.html',
    'nav/collections/nav.Collection',
    'nav/models/nav.Model',
    //'backbone.localStorage'
], function (Mn, _, tpl, Collection, Model, localStorage) {
    'use strict';
    //console.log(localStorage);
    var collection = new Collection([
        {
            title: 'Finder',
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
        template: _.template(tpl)
    });
});