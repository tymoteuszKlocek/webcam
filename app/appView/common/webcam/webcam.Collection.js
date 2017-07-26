define([
    'backbone',
    'app/appView/common/webcam/webcam.Model'
], function (Bb, Model) {
    'use strict';

    return Bb.Collection.extend({
        model: Model
    });
})