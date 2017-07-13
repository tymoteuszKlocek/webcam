/*global define */

define(function (require) {
    'use strict';

    return {
        pages: {
            placeFinder: require('tpl!templates/placeFinder.html'),
            list: require('tpl!templates/list.html'),
            localisator: require('tpl!templates/localisator.html')
        },
        page: require('tpl!templates/page.html'),
        menuItem: require('tpl!templates/menuItem.html'),
        footer: require('tpl!templates/footer.html')
    };
});