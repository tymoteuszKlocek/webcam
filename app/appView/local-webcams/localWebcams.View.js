define([
    'marionette',
    'text!app/appView/local-webcams/localWebcams.View.html',
    'app/appView/local-webcams/localWebcams.Model',
], function (Mn, tpl, Model) {
    'use strict';

    var model = new Model();
    var pos = undefined;
    return Mn.View.extend({
        model: model,
        template: _.template(tpl),
        initialize: function (obj) {
            if (obj) {
                pos = obj.params
            }
        },
        onBeforeRender: function () {
            if (pos !== undefined) {
                this.model.set("localisation", pos);
            }
        },
    })
});