define([
    'backbone',
    'app/common/gallery/gallery.Model',
    'json!app/config/config.json'
], function (Bb, Model, conf) {
    'use strict';

    return Bb.Collection.extend({
        url: conf.req.apiUrl + conf.req.webcamcollections,
        model: Model
    });
});