define([
    'backbone',
    'appView/common/webcam/webcam.Model',
    'backboneLocalstorage',
], function (Bb, Model, Store) {
    'use strict';

    return Bb.Collection.extend({
        url: '/webcamsCol',
        model: Model,
        localStorage: new Store('webcam-backbone')
    });
})