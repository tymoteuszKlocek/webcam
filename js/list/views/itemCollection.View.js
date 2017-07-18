define([
    'marionette',
    'underscore',
    'text!templates/item.html',
    'list/collections/item.Collection',
    'list/models/item.Model'
], function (Mn, _, tpl, Collection, Model) {
    'use strict';

    //var collection = new Collection([
    //    {
    //        title: 'Gallery 1',
    //        url: 'http://www.visages-trekking.com/sites/default/files/styles/flex_produit_custom_user_medium_1x/public/imagesVoyages/dunes_merzouga.jpg?itok=Kz0z_Wbu',
    //        active: true
    //    },
    //    {
    //        title: 'Galerry2',
    //        url: 'https://s-media-cache-ak0.pinimg.com/originals/6e/74/dc/6e74dc970931b5f355b7ccf992e0de29.jpg',
    //    },
    //    {
    //        title: 'Gallery3',
    //        url: 'https://media.mnn.com/assets/images/2015/08/forest-waterfall-thailand.jpg.838x0_q80.jpg'
    //    }
    //]);
    return Mn.View.extend({
        collection: Collection,
        template: tpl
    });
});