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
            return Bb.ajax(_.extend({
                url: 'https://webcamstravel.p.mashape.com/webcams/list/country=' + query + '/orderby=popularity,desc/limit=70?show=webcams:image,url',
                type: 'GET',  
                data: {}, // Additional parameters here
                dataType: 'json',
                success: function (data) { console.log((data)); },
                error: function (err) { alert(err); },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA");
                }
            }));
        },
        searchWithTag: function (query) {
            return Bb.ajax(_.extend({
                url: 'https://webcamstravel.p.mashape.com/webcams/list/category=' + query + '/orderby=popularity/limit=70?show=webcams:location,image,url',
                type: 'GET',  
                data: {}, // Additional parameters here
                dataType: 'json',
                success: function (data) { console.log((data)); },
                error: function (err) { alert(err); },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA");
                }
            }));
        },
        searchNearBy: function (lat, lng) {
            return Bb.ajax(_.extend({
                url: 'https://webcamstravel.p.mashape.com/webcams/list/nearby=' + lat +','+ lng +','+ 100 + '/limit=70?show=webcams:location,image,url',
                type: 'GET',  
                data: {}, // Additional parameters here
                dataType: 'json',
                success: function (data) { console.log((data)); },
                error: function (err) { alert(err); },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA");
                }
            }));
        },
    })
});

//API KEY: 27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA
//examples:
// https://webcamstravel.p.mashape.com/webcams/list/category=beach/country=IT/orderby=popularity,desc/limit=20
// https://webcamstravel.p.mashape.com/webcams/list/?show=webcams:image,url