define([
    'backbone',
    'json!app/config/config.json'    
], function (Bb, conf) {
    'use strict';

    return Bb.Model.extend({
        url: conf.req.apiUrl + conf.req.webcams,
        defaults: {
            city: '',
            country: '',
            countryCode: '',
            views: '',
            lat: '',
            lng: '',
            position: '',
            thumbnail: '',
            type: 'scanner',
            title: '',
            link: ''
        },

        save: function () {
            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.webcams,
                method: 'PUT',
                data: this.attributes,
                dataType: 'json',
            })).then(function (resp) {
                return resp;
            });
        },

        destroy: function () {
            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.webcams,
                method: 'DELETE',
                data: this.attributes,
                dataType: 'json',
            })).then(function (resp) {
                return resp;
            });
        },

        getCollection: function (collectionid) {
            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.webcams + '/' + collectionid,
                method: 'GET',
                data: '',
                dataType: 'json',
            })).then(function (resp) {
                return resp;
            });
        },
    });
});