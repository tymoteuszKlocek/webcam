define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({

        url: "http://127.0.0.1:3000/create-collection",

        defaults: {
            userID: '',
            title: ''
        },

        requestNewCollection: function () {
            
            return Bb.ajax(_.extend({
                url: "http://127.0.0.1:3000/create-collection",
                method: "PUT",
                data: this.attributes,
                dataType: "json",
            })).then(function(resp){ return resp;});
        },

        //TODO ?
        // fetchCollection: function () {
        //     this.fetch().done(function (resp) {
        //         console.log('fetched coll', resp);
        //     });
        //     console.log('fetchCollection');
        // }
    })
})