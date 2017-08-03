define([
    'backbone',
    'marionette',
    'appView/scanner/autocomplete-country-city/autocomplete.backbone',
    'text!appView/scanner/autocomplete-country-city/autocomplete.View.html',
    'appView/scanner/autocomplete-country-city/autocomplete.Collection',
], function (Bb, Mn, Autocomplete, tpl, Collection) {
    'use strict';

    var collection = new Collection();

    var states = [
        { name: 'Poland' },
        { name: 'Alabama' },
        { name: 'Michigan' },
        { name: 'Minnesota' },
        { name: 'Ohio' },
        { name: 'New York' },
    ];

    var typeahead = new Autocomplete(states);
    typeahead.setElement('#autocomplete').render();

    return Mn.View.extend({

        template: _.template(tpl),

        ui: {
            autocpl: '#autocpl',
        },

        events: {
            'keypress @ui.autocpl': 'search',
        },

        initialize: function () {
            typeahead.setElement('#autocomplete').render();
            typeahead.on('selected', function (model) {
                console.log('The user has selected:', model);
            });
        },

        onRender: function () {
            typeahead.setElement('#autocomplete').render();
           
        },
        search: function () {
            console.log('yes');
            typeahead.setElement('#autocomplete').render();
        },

        // useTagName: function (str) {

        //     var self = this;

        //     position = localisationService.getLocalisation();
        //     searchWebcamSession.searchWithTag(str).then(function (resp) {
        //         webcamCol = new WebcamCol(self.createModel(resp));
        //     }).then(function () {
        //         self.populate();
        //     });
        // },

        // populate: function () {
        //     this.showChildView('webcamRegion', new WebcamColView({ collection: webcamCol, state: 'scanner' }));
        // },

        // createModel: function (resp) {
        //     var arr = [];

        //     _.each(resp.result.webcams, function (obj) {
        //         var newModel = new WebcamModel({
        //             id: obj.id,
        //             city: obj.location.city,
        //             country: obj.location.country,
        //             countryCode: obj.location.country_code,
        //             views: obj.statistics.views,
        //             lat: obj.location.latitude,
        //             lng: obj.location.longitude,
        //             position: obj.location.latitude.toFixed(3) + ',' + obj.location.longitude.toFixed(3),
        //             thumbnail: obj.image.current.preview || '',
        //             state: 'scanner',
        //             title: obj.title || 'name unknown',
        //             link: obj.url.current.desktop || ''
        //         });
        //         arr.push(newModel);
        //     });

        //     return arr
        // },

        // checkKeyPress: function (e) {

        //     var ENTER = 13;
        //     var queryTxt = this.ui.query.val().trim();

        //     this.model.set('query', queryTxt);

        //     if (e.which === ENTER) {
        //         this.search();
        //     }
        // },
    })
})