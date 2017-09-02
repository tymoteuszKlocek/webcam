define([
    'marionette',
    'text!app/common/info/info.View.html',
    'app/common/info/info.Model',
], function (Mn, tpl, Model) {
    'use strict';
    
    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),
        initialize: function(opt) {
            this.model.set('info', opt.text);
        },
    });
});