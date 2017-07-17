define([
    'marionette',
    'controllers/MainController'
], function (Mn, MainController) {
    'use strict';

    var mainController = new MainController();

    return Mn.AppRouter.extend({
        controller: mainController,
        appRoutes: {
            '': 'showFinder',
            'finder': 'showFinder',
            'localisation': 'showLocalisation',
            'list': 'showList',
            //'*': 'showDefaultView'
        }
    });
});