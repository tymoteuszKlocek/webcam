define([
    'backbone',
    'backboneLocalstorage',
    'app/appView/common/localisation/localisation.Service'
], function (Bb, Store, LocalisationService) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            position: 'position',
            query: '',
            tags: {
                airport: 'Airport',
                area: 'Area',
                bay: 'Bay',
                beach: 'Beach',
                building: 'Building',
                camping: 'Camping',
                city: 'City',
                coast: 'Coast',
                forest: 'Forest',
                golf: 'Golf',
                harbor: 'Harbor',
                resort: 'Resort',
                island: 'Island',
                lake: 'Lake',
                mountain: 'Mountain',
                //canyon: 'Canyon',
                other: 'Other',
                landscape: 'Landscape',
                park: 'Park',
                pool: 'Pool',
                indoor: 'Indoor',
                meteo: 'Meteo',
                sportarea: 'SportArea',
                square: 'Square',
                traffic: 'Street',
                traffic: 'Traffic',
                water: 'Water',

            }
        },
        initialize: function () {
            var localisationService = new LocalisationService();
            this.position = localisationService.getLocalisation();
        },
        localStorage: new Store('webcam-scanner-backbone')
    })
})

