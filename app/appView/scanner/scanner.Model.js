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
                golf: 'Golfcourse',
                harbor: 'Harbor',
                resort: 'Holiday Resort',
                island: 'Island',
                lake: 'Lake',
                river: 'River',
                mountain: 'Mountain',
                canyon: 'Canyon',
                other: 'Other',
                landscape: 'Outdoor',
                park: 'Park',
                pool: 'Pool',
                indoor: 'Public Indoor',
                meteo: 'Sky',
                sportarea: 'Sport Area',
                square: 'Square',
                allay: 'Alley',
                traffic: 'Street',
                traffic: 'Traffic',
                water: 'Water',

            }
        },
        
    })
})

