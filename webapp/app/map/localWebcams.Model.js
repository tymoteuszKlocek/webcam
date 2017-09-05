define([
    'backbone',
    'json!app/config/config.json',
], function (Bb, conf) {
    'use strict';

    return Bb.Model.extend({
        url: '/',
        defaults: {
            url: conf.map.SRC + conf.map.MODE + conf.map.API_KEY,
            position: conf.map.POSITION,
            localisation: conf.map.LOCALISATION,
            zoom: conf.map.ZOOM,
            type: conf.map.TYPE,
            country: 'unknown country'
        },
    });
});