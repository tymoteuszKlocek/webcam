define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({

        url: "http://127.0.0.1:3000/collections",

        defaults: {
            collectionID: null,
            title: 'title',
        },

        saveInCollection: function (collectionID) {

            return Bb.ajax(_.extend({
                url: "http://127.0.0.1:3000/webcams/" + collectionID,
                method: "PUT",
                data: "",
                dataType: "json",
            })).then(function (resp) {
                return resp;
            });
        },

    })
})

