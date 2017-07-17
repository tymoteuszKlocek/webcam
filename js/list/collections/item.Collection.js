define([
    'backbone',
    'list/models/item.Model'
], function (Bb, Model) {
    'use strict';

    return Bb.Collection.extend({
        model: Model
    })
})