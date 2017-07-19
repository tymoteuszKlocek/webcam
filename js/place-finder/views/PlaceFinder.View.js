define([
    'marionette',
    'backbone',
    'radio',
    'text!templates/placeFinder.html',
    'underscore',
    'place-finder/models/placeFinder.Model',
    'webcam/views/webcam.View',
    'webcam/models/webcam.Model',
    'list/models/item.Model'
], function (Marionette, Backbone, Radio, tpl, _, Model, WebcamView, WebcamModel, ItemModel) {
    'use strict';

    var model = new Model();
    
    var newItemChannel = Backbone.Radio.channel('newItem');
    return Marionette.View.extend({
        template: _.template(tpl),
        tagName: 'div',
        className: 'place-finder-area',
        regions: {
            webcamRegion: '#webcam'
        },
        ui: {
            form: 'form',
            place: 'input[name=place]',
            find: '#find',
            cancel: '#cancel',
            successMessage: '.msg-success',
            authErrorMessage: '.error-bad-auth',
            generalErrorMessage: '.error-unknown'
        },
        events: {
            //'submit form': 'formSubmitted',
            'click @ui.cancel': 'clear',
            'click @ui.find': 'find',
            'keypress @ui.input': 'onInputKeypress'
        },
        //modelEvents: {
        //    //'change:place': 'render',
        //    //'change:state': 'render',
        //    
        //},
        formSubmitted: function () {
            console.log('save');
            var place = this.ui.place.val().trim();
            var newModel = new ItemModel({
                title: place,
                url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                state: 'not yet'
            });
            placeChannel.trigger('place:detected', newModel);
            //send model by radio and create new collection
            model.set('place', place);
            console.log('model.place', model.get('place'));
            //this.model.save({ place: place });
        },
        onRender: function () {
            console.log('render fired: ', model.get('place'));
     
        },
        save: function(item) {
            console.log('save', item);
            this.store(item);
            newItemChannel.trigger('newItem:added', item);
        },
        find: function() {
            //this should find place with REST request
            var place = this.ui.place.val().trim();
            var newModel = new Model({
                place: place,
                url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                state: 'not yet'
            });
            var newItem = new ItemModel({
                title: place,
                url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Lublin_trzy_wie%C5%BCe.jpg',
                state: 'not yet'
            });
            //newItem.save();
            console.log('model.place', newModel.get('place'));
            this.save(newItem);
            // var webcamModel = new WebcamModel();
            // var webcamView = new WebcamView(webcamModel);
            // this.showChildView('webcamRegion', webcamView);
            //console.log('childView', this.getChildView('webcamRegion'));
        },
        clear: function () {
            this.ui.place.val('');
            localStorage.setItem("collection", JSON.stringify([]));
        },
        onInputKeypress: function(e) {
            var ENTER_KEY = 13;
            var text = this.ui.input.val().trim();
            if (e.which === ENTER_KEY && text) {
                console.log('you pressed enter');
                this.find();
            }
        },
        actOnChange: function (value) {
            console.log('New value: ', this.ui.place.val().trim());
        },
        store: function(item) {
            var collection = JSON.parse(localStorage.getItem("collection")) || [];
            collection.push(item);
            localStorage.setItem("collection", JSON.stringify(collection));
            console.log('storage po zapisie', localStorage.getItem("collection"));
        }
    });
})