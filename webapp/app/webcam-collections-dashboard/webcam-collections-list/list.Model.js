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

        getCollection: function (collection) {
            console.log('coll in req', collection.model.attributes.id);
            this.collectionID = collection.model.attributes.id;
            return Bb.ajax(_.extend({
                url: "http://127.0.0.1:3000/webcams",
                method: "GET",
                data: this.attributes,
                dataType: "json",
            })).then(function(resp) {
                console.log('webcams', resp) 
            });
        },

        removeItem: function (title) {

            return Bb.ajax(_.extend({
                url: "http://127.0.0.1:3000/collections",
                method: "DELETE",
                data: this.attributes,
                dataType: "json",
            }));
        }
    })
})

