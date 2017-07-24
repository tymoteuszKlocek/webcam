define([
    'marionette',
    'text!list/listCollection.html',
    'list/list.Collection',
    'list/list.View'
], function (Mn, tpl, Collection, ListItemView) {
    'use strict';
    
    var renderChannel = Backbone.Radio.channel('renderView'); 
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
    return Mn.CollectionView.extend({
        collection: collection,
        template: _.template(tpl),
        tagName: 'ul',
        className: 'gallery-links',
        childView: ListItemView,
        regions: {
            ul: '#list',
            replaceElement: false
        },
        onChildviewTitleSelected: function(childView) {
            var title = childView.model.attributes.title;
            renderChannel.trigger('show:gallery', title);
            //this.trigger('child:title:selected', title);
        },
    });
});