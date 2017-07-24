define([
    'marionette',
    'text!nav/nav.html',
    'nav/nav.Collection'
], function (Mn, tpl, Collection) {
    'use strict';
    
    var collection = new Collection([
        {
            title: 'Find place',
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
        template: _.template(tpl),
        className: 'nav-panel'
    });
});