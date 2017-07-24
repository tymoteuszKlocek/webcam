define([
    'backbone'
], function(Bb) {
    'use stric';

    return Bb.Model.extend({
        defaults: {
            title: 'Lublin',
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg'
        }
    });
});