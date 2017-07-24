define([
    'backbone',
    'gallery/galleryItem.Model'
], function (Bb, Model) {
    'use strict';
    
    return Bb.Collection.extend({
        model: Model
    });
})