define([
    'backbone',
    'marionette'
], function (Bb, Mn) {
    'use strict';

    return Bb.Model.extend({
        urlRoot: 'https://webcamstravel.p.mashape.com/',
        defaults: {
            auth: '"X-Mashape-Key", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA"',
            query: null
        },
        sendQuery: function (query) {
            console.log('session is in progress');
            return Bb.ajax(_.extend({
                url: 'https://webcamstravel.p.mashape.com/webcams/list/category='+ query + '/orderby=popularity,desc/limit=20?show=webcams:image,url',
                type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
                data: {}, // Additional parameters here
                dataType: 'json',
                success: function (data) { console.log((data)); },
                error: function (err) { alert(err); },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA");
                }
            }));
        }
    })
});

//API KEY: 27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA
//examples:
// https://webcamstravel.p.mashape.com/webcams/list/category=beach/country=IT/orderby=popularity,desc/limit=20
// https://webcamstravel.p.mashape.com/webcams/list/?show=webcams:image,url