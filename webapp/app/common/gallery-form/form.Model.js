define([
    'backbone',
], function (Bb) {
    'use strict';

    return Bb.Model.extend({

        url: 'http://127.0.0.1:3000/collections',

        defaults: {
            title: ''
        },
        
        submit: function () {
            
            return Bb.ajax(_.extend({
                url: 'http://127.0.0.1:3000/collections',
                method: 'PUT',
                data: this.attributes,
                dataType: 'json',
            }));
        }
    });
});