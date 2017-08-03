define([
    'backbone'
], function(Bb) {
    'use strict';

    return Bb.Model.extend({
        defaults: {
            countryCode: {
                pl: 'PL',
                po: 'PO',
            }
        }
    })
});