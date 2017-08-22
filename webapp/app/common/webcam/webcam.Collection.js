define([
    'backbone',
    'app/common/webcam/webcam.Model',
], function (Bb, Model, Store) {
    'use strict';

    return Bb.Collection.extend({
        model: Model,
        //url: 'http://127.0.0.1:3000/webcams-collections',
        parse: function (response) {
            return response.results;
        }
    });
})