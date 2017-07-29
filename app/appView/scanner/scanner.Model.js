define([
    'backbone',
    'backboneLocalstorage',
], function (Bb, Store) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
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
        
    })
})

