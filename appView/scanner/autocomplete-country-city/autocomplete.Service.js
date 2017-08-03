define([
    'backbone',
    'marionette'
], function (Bb, Mn) {
    'use strict';
//https://stackoverflow.com/questions/8282026/how-to-limit-google-autocomplete-results-to-city-and-country-only
    var SRC = 'https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&strictbounds&key=';
    var API_KEY = "AIzaSyCgT4YN_0LNImvJaUjxGQytPtePSaBoprA";

    return Bb.Model.extend({

        defaults: {
            auth: '"X-Mashape-Key", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA"',
        },
        
        searchForPlace: function (category, query) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                var url = SRC + API_KEY;
                xhr.open("GET", url);
                //xhr.setRequestHeader("X-Mashape-Authorization", "27CJ6JXzDAmshqOhSle85KVk4Edfp1Rmd4PjsnrmJNbw20YsyA")
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        console.log('place', JSON.parse(xhr.response));
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject(xhr);
                };
                xhr.send();
            })
        }
    })
});