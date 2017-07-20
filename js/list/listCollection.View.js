﻿define([
    'marionette',
    'text!list/listItem.html',
    'list/list.Collection',
], function (Mn, tpl, Collection) {
    'use strict';
    
    var collection = new Collection([
        {
            title: 'Item1 from list',
            active: false
        },
        {
            title: 'Item2 from list',
            active: false
        },
        {
            title: 'Item3 from list',
            active: false
        },
        {
            title: 'Item1 from list',
            active: false
        },
        {
            title: 'Item2 from list',
            active: false
        },
        {
            title: 'Item3 from list',
            active: false
        },
    ]);

    return Mn.View.extend({
        collection: collection,
        template: _.template(tpl),
        
    });
});