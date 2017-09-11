define([
    'backbone',
    'json!app/config/config.json'
], function (Bb, conf) {
    'use strict';

    return Bb.Model.extend({

        url: conf.req.apiUrl + conf.req.webcamcollections,

        defaults: {
            title: ''
        },
        
        submit: function () {
            
            return Bb.ajax(_.extend({
                url: conf.req.apiUrl + conf.req.webcamcollections,
                method: 'PUT',
                data: this.attributes,
                dataType: 'json',
            }));
        }
    });
});