/*global define */

define(function (require) {
    'use strict';

    return {
        //pages: {
        //    placeFinder: require('tpl!templates/placeFinder.html'),
        //    list: require('tpl!templates/list.html'),
        //    localisator: require('tpl!templates/localisator.html')
        //},
        placeFinder: require('tpl!templates/placeFinder.html'),
        nav: require('tpl!templates/nav.html'),
        list: require('tpl!templates/list.html'),
        item: require('tpl!templates/item.html'),
        webcam: require('tpl!templates/webcam.html'),
        page: require('tpl!templates/page.html'),
    };
});