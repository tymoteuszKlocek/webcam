define([
    'backbone',
    'nav/models/nav.Model'
], function (Bb, Model) {
    'use strict';

    return Bb.Collection.extend({
        model: Model
    })
})