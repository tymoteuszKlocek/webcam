define([
    'backbone',
    'app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.Model',
], function (Bb, Model) {
    'use strict';

    return Bb.Collection.extend({
        url: "http://127.0.0.1:3000/collections",
        model: Model
    });
})