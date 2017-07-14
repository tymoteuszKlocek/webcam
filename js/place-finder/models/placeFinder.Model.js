define([
    'backbone',
], function (Backbone) {
    'use stric';

    return Backbone.Model.extend({
        defaults: {
            url: 'some url',
            active: false
        },
        toggle: function () {
            this.save({ active: !this.get('active') });
        }
    })
})