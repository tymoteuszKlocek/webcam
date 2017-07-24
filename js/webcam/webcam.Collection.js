define([
    'backbone',
    'webcam/webcam.Model'
], function (Bb, Model) {
    'use strict';

    return Bb.Collection.extend({
        model: Model
    });
})