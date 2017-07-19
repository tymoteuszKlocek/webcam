define([
    'marionette',
    'templates',
    'list/collections/item.Collection',
], function (Mn, tpl, Collection) {
    'use strict';
    
    return Mn.View.extend({
        template: _.template(tpl.item)
    });
});