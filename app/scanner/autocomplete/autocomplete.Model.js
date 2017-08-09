define([
    'backbone',
    'backboneLocalstorage',
], function(Bb, Store) {
    'use strict';

    return Bb.Model.extend({
        urlRoot: '/autocomplete/model',
        defaults: {
            name: 'default name',
            code: 'default code'
        },
    })
});