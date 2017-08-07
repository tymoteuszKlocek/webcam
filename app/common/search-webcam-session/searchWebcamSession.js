define([
    'backbone',
    'marionette'
], function (Bb, Mn) {
    'use strict';

    var SRC = 'https://webcamstravel.p.mashape.com/webcams/list/';
    var PARAMS = '/limit=70?show=webcams:location,image,url,statistics';
    var API_KEY = "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA";

    return Bb.Model.extend({

        defaults: {
            auth: '"X-Mashape-Key", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA"',
        },
        
        searchForWebcam: function (category, query) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                var url = SRC + category + query + PARAMS;
                var RANGE = 100; //(range from your localisation in km)

                if(category === 'nearby=') {
                    url = SRC + category + query + ',' + RANGE + PARAMS;
                }

                xhr.open("GET", url);
                xhr.setRequestHeader("X-Mashape-Authorization", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA")
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject(xhr.statusText);
                };
                xhr.send();
            })
        }
    })
});