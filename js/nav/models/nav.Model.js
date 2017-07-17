define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            title: 'Page title',
            url: '#/url',
            active: false
        },
        //toggle: function () {
        //    this.save({ active: !this.get('active') });
        //    //this.on({ 'click: clicked', this.render })
        //}

    })
});