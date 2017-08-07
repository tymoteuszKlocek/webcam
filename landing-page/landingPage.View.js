define([
    'marionette',
    'text!landing-page/landingPage.View.html',
    'landing-page/landingPage.Model',
], function (Mn, tpl, Model) {
    'use strict';

    var model = new Model();
    var widget;
    
    return Mn.View.extend({
        model: model,
        template: _.template(tpl),
        className: 'outer-box',
    })
});