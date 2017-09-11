define([
    'backbone',
    'app/common/webcam/webcam.Model',
    'json!app/config/config.json'
], function (Bb, Model, conf) {
    'use strict';

    return Bb.Collection.extend({
        model: Model,
        url: conf.req.apiUrl + conf.req.webcamcollections,
        parse: function (response) {
            return response.results;
        }
    });
});