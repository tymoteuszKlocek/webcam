define([
    'backbone',
    'app/common/gallery/gallery.Collection'
], function (Bb) {
    'use strict';

    return Bb.Model.extend({

        url: 'http://127.0.0.1:3000/collections',

        defaults: {
            title: '',
        },

        getCollection: function (collectionID) {

            this.collectionID = collectionID;

            return Bb.ajax(_.extend({
                url: 'http://127.0.0.1:3000/webcams',
                method: 'GET',
                data: this.attributes,
                dataType: 'json',
            })).then(function(resp) {
                return resp;
            });
        },

        removeItem: function () {

            return Bb.ajax(_.extend({
                url: 'http://127.0.0.1:3000/collections',
                method: 'DELETE',
                data: this.attributes,
                dataType: 'json',
            })).then(function(resp) {
                return resp;
            });
        }
    });
});

