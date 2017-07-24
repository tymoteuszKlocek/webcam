define([
    'marionette',
    'backbone',
    //'localStorage',
    'radio',
    'text!place-finder/placeFinder.html',
    'place-finder/placeFinder.Model',
    'webcam/webcam.CollectionView'
], function (Marionette, Backbone, Radio, tpl, Model, WebcamCollection) {
    'use strict';

    return Marionette.View.extend({
        template: _.template(tpl),
        tagName: 'div',
        className: 'panel',
        regions: {
            webcamRegion: {
                el: '#webcam',
                replaceElement: true
            }
        },
        ui: {
            form: 'form',
            country: 'input[name=country]',
            category: 'input[name=category]',
            find: '#find',
            cancel: '#cancel',
            save: '#save',
            delete: '#delete'
        },
        events: {
            'click @ui.cancel': 'clear',
            'click @ui.find': 'find',
        },
        triggers:{
            'click @ui.save': 'open:dialog',
        },
        find: function () {
            //TODO REST request here
            this.showChildView('webcamRegion', new WebcamCollection());
            this.clear();
        },
        clear: function () {
            this.ui.country.val('');
            this.ui.category.val('');
        }
    });
})