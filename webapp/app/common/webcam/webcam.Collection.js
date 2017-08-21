define([
    'backbone',
    'app/common/webcam/webcam.Model',
], function (Bb, Model, Store) {
    'use strict';

    return Bb.Collection.extend({
        model: Model,
        parse: function (response) {
            return response.results; 
        }
    });
})