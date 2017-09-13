define([
    'backbone',
    'app/common/localisation/localisation.Service'
], function (Bb,  LocalisationService) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            position: 'position',
            query: '',
            size: 0,
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
                other: 'Other',
                landscape: 'Landscape',
                park: 'Park',
                pool: 'Pool',
                indoor: 'Indoor',
                meteo: 'Meteo',
                sportarea: 'SportArea',
                square: 'Square',
                traffic: 'Traffic',
                water: 'Water',

            }
        },

        initialize: function () {
            var localisationService = new LocalisationService();
            var self = this;
            localisationService.getLocalisation().then(function (response) {
                self.position = response;
            });
        },

    });
});

