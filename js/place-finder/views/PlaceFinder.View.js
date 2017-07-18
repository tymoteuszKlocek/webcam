define([
    'marionette',
    'radio',
    //'localStorage',
    'text!templates/placeFinder.html',
    'underscore',
    'place-finder/models/placeFinder.Model'
], function (Marionette, Radio, tpl, _, Model) {
    'use strict';

    var model = new Model();
    //console.log('storage', Storage);

    var placeChannel = Backbone.Radio.channel('place');
    return Marionette.View.extend({
        template: _.template(tpl),
        tagName: 'div',
        className: 'place-finder-area',
        ui: {
            form: 'form',
            place: 'input[name=place]',
            cancel: '#cancel',
            successMessage: '.msg-success',
            authErrorMessage: '.error-bad-auth',
            generalErrorMessage: '.error-unknown'
        },
        events: {
            'submit form': 'formSubmitted',
            'click @ui.cancel': 'clear',
        },
        //modelEvents: {
        //    //'change:place': 'render',
        //    //'change:state': 'render',
        //    
        //},
        formSubmitted: function (val) {
            var place = this.ui.place.val().trim();
            var newModel = new Model({
                place: place,
                url: 'url from api',
                state: 'not yet'
            });
            placeChannel.trigger('place:detected', newModel);
            //send model by radio and create new collection
            
            model.set('place', place);
            console.log('model.place', model.get('place'), val);
            //this.model.save({ place: place });
        },
        //onRender: function () {
        //    console.log('render fired - state: ', model.get('place'),'natomiast input', this.ui.place.val().trim());
        //},
        clear: function () {
            this.ui.place.val('');
        },
        actOnChange: function (value) {
            console.log('New value: ', this.ui.place.val().trim());
        }
    });
})