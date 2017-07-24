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

    var renderChannel = Backbone.Radio.channel('renderView');
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
            'click @ui.delete': 'closeWebcam',
        },
        childViewEvents: {
            'open:Dialog': 'openDialog',
            'hide:dialog': 'closeWebcam'
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
        },
        // onChildViewOpenDialog: function (childView) {
        //     console.log('title from Webcam', childView.model.title);
        //     renderChannel.trigger("show:dialog");
        // },
        closeWebcam: function () {
            this.detachChildView('webcamRegion');
        }

    });
})