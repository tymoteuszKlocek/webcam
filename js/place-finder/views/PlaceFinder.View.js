define([
    'marionette'
], function (Marionette) {
    'use strict';
    var myTemplate = _.template('<div>it works</div>');
   
    return Marionette.View.extend({
        template: myTemplate
    });
})