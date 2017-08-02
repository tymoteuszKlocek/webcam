define([
    'backbone',
    'typeahead'
], function (Backbone) {
    'use strict';

    return Backbone.Typeahead.extend({
        template: '<input type="text" placeholder="Search" /><ul class="typeahead dropdown-menu"></ul>',
        initialize: function() {
            console.log('auto');
        },
        
    })
})

