define([
    'backbone',
    'json!app/config/config.json'
], function (Bb, conf) {
    'use strict';

    return Bb.Model.extend({

        url: conf.req.apiUrl + conf.req.webcamcollections,

        defaults: {
            title: '',
        },

        getCollection: function (collectionID) {

            this.collectionID = collectionID;

            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.webcams,
                method: 'GET',
                data: this.attributes,
                dataType: 'json',
            })).then(function(resp) {
                return resp;
            });
        },

        removeItem: function () {

            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.webcamcollections,
                method: 'DELETE',
                data: this.attributes,
                dataType: 'json',
            })).then(function(resp) {
                return resp;
            });
        }
    });
});

