define([
    'marionette',
    'text!gallery/galleryItem.html',
], function (Mn, tpl) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl)
    });
})