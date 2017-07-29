define([
    'backbone',
    'marionette'
], function (Bb, Mn) {
    'use strict';

    var SRC = 'https://webcamstravel.p.mashape.com/webcams/list/';
    var PARAMS = '/limit=70?show=webcams:location,image,url,statistics';
    var API_KEY = "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA";
    return Bb.Model.extend({
        urlRoot: 'https://webcamstravel.p.mashape.com/',
        defaults: {
            auth: '"X-Mashape-Key", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA"',
            query: null
        },
        searchByCountry: function (query) {
            return Bb.ajax(_.extend({
                url: SRC + 'country=' + query + PARAMS,
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
                url: SRC + 'category=' + query + PARAMS,
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
                url: SRC + 'nearby=' + lat + ',' + lng + ',' + 100 + PARAMS,
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