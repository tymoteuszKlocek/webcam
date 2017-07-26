define([
    'marionette',
    'text!app/appView/local-webcams/localWebcams.View.html',
    'app/appView/local-webcams/localWebcams.Model',
], function(Mn, tpl, Model) {
    'use strict';
    
    var model = new Model();
    return Mn.View.extend({
        model: model,
        template: _.template(tpl)
    })
});