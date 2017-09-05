define([
    'marionette',
    'text!app/landing-page/landingPage.View.html',
    'app/landing-page/landingPage.Model',
], function (Mn, tpl, Model) {
    'use strict';
    
    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),
        className: 'outer-box',
    });
});