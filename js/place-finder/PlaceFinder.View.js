define([
    'marionette',
    'backbone',
    //'localStorage',
    'radio',
    'text!place-finder/placeFinder.html',
    'place-finder/placeFinder.Model',
    'webcam/webcam.View'
], function (Marionette, Backbone, Radio, tpl, Model, Webcam) {
    'use strict';

    var newItemChannel = Backbone.Radio.channel('newItem');
    return Marionette.View.extend({
        template: _.template(tpl),
        tagName: 'div',
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
            create: '#create'
            // successMessage: '.msg-success',
        },
        events: {
            //'submit form': 'formSubmitted',
            'click @ui.cancel': 'clear',
            'click @ui.find': 'find',
        },
        find: function () {
            //TODO REST request here
            //this.showChildView('webcamRegion', new Webcam());
            this.clear();
        },
        clear: function () {
            this.ui.country.val('');
            this.ui.category.val('');
        },
        store: function(item) {
            // var collection = JSON.parse(localStorage.getItem("collection")) || [];
            // collection.push(item);
            // localStorage.setItem("collection", JSON.stringify(collection));
            // console.log('storage po zapisie', localStorage.getItem("collection"));
        },
        onRender: function () {
            //TODO append as many Views as needed
            this.showChildView('webcamRegion', new Webcam());
        }
    });
})