define([
    'marionette',
    'controllers/MainController'
], function (Mn, MainController) {
    'use strict';

    var mainController = new MainController();

    return Mn.AppRouter.extend({
        controller: mainController,
        appRoutes: {
            '': 'showList',
            'gallery': 'showGallery',
            'localisation': 'showLocalisation',
            'list': 'showList',
            //'*': 'showDefaultView'
        }
    });
});