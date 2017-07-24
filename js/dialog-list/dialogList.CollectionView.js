define([
    'marionette',
    'text!dialog-list/dialogListCollection.html',
    'dialog-list/dialogList.Collection',
    'dialog-list/dialogListItem.View'
], function (Mn, tpl, Collection, DialogListItemView) {
    'use strict';
    
    var collection = new Collection([
        {
            title: 'Item1 from list',
            id: 0,
            active: false
        },
        {
            title: 'Item2 from list',
            id: 1,
            active: false
        },
        {
            title: 'Item3 from list',
            active: false
        },
        {
            title: 'Item4 from list',
            active: false
        },
        {
            title: 'Item5 from list',
            active: false
        },
        {
            title: 'Item6 from list',
            active: false
        },
    ]);
    //console.log(collection.models[0].cid);
    return Mn.CollectionView.extend({
        collection: collection,
        template: _.template(tpl),
        tagName: 'ul',
        className: 'list',
        childView: DialogListItemView,
        regions: {
            ul: '#list',
            replaceElement: false
        },
        ui:{
            input: 'input[type=radio]',
            link: 'a'
        },
        childViewEvents:{
            'change @ui.input': 'createGalleryTitle',
            'item:clicked': 'cliked'
        },
        createGalleryTitle: function() {
            console.log( this.ui.input.val().trim());

        },
        onChildViewItemClicked: function(childView) {
            console.log('click:', childView.model.title)
        },
        onRender: function() {
        }
    });
});