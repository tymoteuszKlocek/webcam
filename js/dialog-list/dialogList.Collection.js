define([
    'backbone',
    'dialog-list/dialogListItem.Model'
], function (Bb, Model) {
    'use strict';

    return Bb.Collection.extend({
        model: Model
    });
})