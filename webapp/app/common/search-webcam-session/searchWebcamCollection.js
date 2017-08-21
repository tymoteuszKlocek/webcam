define([
    'backbone',
    'marionette',
    'json!app/config/config.json',
    'app/common/webcam/webcam.Collection',
    'app/common/webcam/webcam.Model',
], function (Bb, Mn, config, WebcamCol, WebcamModel) {
    'use strict';

    return Bb.Collection.extend({
        url: '/choose-webcam',
        model: WebcamModel,

        parse: function (data) {
            
            var self = this;
            var arr = [];

            _.each(data.result.webcams, function (obj) {
                var newModel = new WebcamModel({
                    id: obj.id,
                    city: obj.location.city,
                    country: obj.location.country,
                    countryCode: obj.location.country_code,
                    views: obj.statistics.views,
                    lat: obj.location.latitude,
                    lng: obj.location.longitude,
                    position: obj.location.latitude.toFixed(3) + ',' + obj.location.longitude.toFixed(3),
                    thumbnail: obj.image.current.preview || '',
                    state: 'scanner',
                    title: obj.title || 'name unknown',
                    link: obj.url.current.desktop || ''
                });
                arr.push(newModel);
                
            });
            data.result = this.add(arr);
            return data;
        },

        fetch: function (category, query) {

            var url = config.webcamSearch.SRC + category + query + config.webcamSearch.PARAMS;
            
            if (category === 'nearby=') {
                url = config.webcamSearch.SRC + category + query + ',' + config.webcamSearch.RANGE + config.webcamSearch.PARAMS;
            }

            return Bb.Collection.prototype.fetch.call(this, { url: url, headers: { 'X-Mashape-Authorization': config.webcamSearch.API_KEY } });
        },
        
    })
});