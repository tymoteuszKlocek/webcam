define([
    'marionette',
    'text!webcam/webcamCollection.html',
    'webcam/webcam.Collection',
    'webcam/webcam.View'
], function (Mn, tpl, Collection, WebcamView) {
    'use strict';
    
    var collection = new Collection([
        {
            title: 'Paris1',
            url: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/France/Paris/paris-attractions-xlarge.jpg',
            active: false
        },
        {
            title: 'Paris2',
            url: 'https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/2050/SITours/eiffel-tower-dinner-and-seine-river-cruise-in-paris-459739.jpg',
            active: false
        },
        {
            title: 'Paris3',
            url: 'http://www.universal-tourguide.com/wp-content/uploads/2016/09/discoverparis-universaltourguide.jpg',
            active: false
        },
        {
            title: 'Paris4',
            url: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/France/Paris/paris-attractions-xlarge.jpg',
            active: false
        },
        {
            title: 'Paris5',
            url: 'https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/2050/SITours/eiffel-tower-dinner-and-seine-river-cruise-in-paris-459739.jpg',
            active: false
        },
        {
            title: 'Paris6',
            url: 'http://www.universal-tourguide.com/wp-content/uploads/2016/09/discoverparis-universaltourguide.jpg',
            active: false
        },
       
    ]);

    return Mn.CollectionView.extend({
        collection: collection,
        template: _.template(tpl),
        tagName: 'div',
        className: 'webcam-container',
        childView: WebcamView,
        regions: {
            box: '#webcam-box',
            replaceElement: false
        },
        ui:{
            item: 'a'
        },
        childViewEvents:{
            'item:clicked': 'cliked'
        },
        createGalleryTitle: function() {
            console.log( this.ui.input.val().trim());

        },
        onChildViewItemClicked: function(childView) {
            console.log('click:', childView.model.title)
        },
        onChildViewCloseWebcam: function(childView) {
            console.log('close webcam:', childView.model.title);
            this.detachChildView('webcamRegion', childView);
        },
    });
});