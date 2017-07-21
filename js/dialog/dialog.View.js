define([
    'marionette',
    'backbone',
    'text!dialog/dialog.html'
], function(Mn, Bb, tpl) {
    'use stric';

    var Dialog = Bb.Model.extend(); // is this ok?

    return Mn.View.extend({
        template: _.template(tpl),

    })
})