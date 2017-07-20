define([
    'marionette',
    'backbone',
    //'localStorage',
    'radio',
    'text!place-finder/placeFinder.html',
    'place-finder/placeFinder.Model',
], function (Marionette, Backbone, Radio, tpl, Model) {
    'use strict';

    var newItemChannel = Backbone.Radio.channel('newItem');
    var model = new Model();
    return Marionette.View.extend({

        template: _.template(tpl),
        tagName: 'div',
        regions: {
            webcamRegion: '#webcam'
        },
        // ui: {
        //     form: 'form',
        //     country: 'input[name=caountry]',
        //     category: 'input[name=category]',
        //     find: '#find',
        //     cancel: '#cancel',
        //     successMessage: '.msg-success',
        //     authErrorMessage: '.error-bad-auth',
        //     generalErrorMessage: '.error-unknown'
        // },
        // events: {
        //     //'submit form': 'formSubmitted',
        //     'click @ui.cancel': 'clear',
        //     'click @ui.find': 'find',
        //     'keypress @ui.input': 'onInputKeypress'
        // },
        // formSubmitted: function () {
        // },
        // save: function(item) {
        //     console.log('save', item);
        //     this.store(item);
        //     newItemChannel.trigger('newItem:added', item);
        // },
        // find: function() {
        //     //this should find place with REST request
        //     var country = this.ui.country.val().trim();
        // },
        // clear: function () {
        //     this.ui.country.val('');
        // },
        // onInputKeypress: function(e) {
        //     var ENTER_KEY = 13;
        //     var text = this.ui.input.val().trim();
        //     if (e.which === ENTER_KEY && text) {
        //         console.log('you pressed enter');
        //         this.find();
        //     }
        // },
        // store: function(item) {
        //     var collection = JSON.parse(localStorage.getItem("collection")) || [];
        //     collection.push(item);
        //     localStorage.setItem("collection", JSON.stringify(collection));
        //     console.log('storage po zapisie', localStorage.getItem("collection"));
        // }
        onRender: function() {
            console.log('render', this.model);
        }
    });
})