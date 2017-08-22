define([
    'marionette',
    'text!app/login/login.View.html',
    'app/login/login.Model',
], function (Mn, tpl, Model) {
    'use strict';

    var model = new Model();
    
    return Mn.View.extend({

        model: model,

        template: _.template(tpl),

        className: 'card',

        


    })
});