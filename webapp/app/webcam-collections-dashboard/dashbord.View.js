define([
    'marionette',
    'text!app/webcam-collections-dashboard/dashboard.View.html',
    'app/webcam-collections-dashboard/dashboard.Model',
    'app/webcam-collections-dashboard/webcam-collections-list/list.CollectionView',
    'app/webcam-collections-dashboard/webcam-collection-form/form.View',
    'app/webcam-collections-dashboard/webcam-collections-list/list.Collection'
], function (Mn, tpl, Model, CollectionList, CreateCollectionForm, ListCol) {
    'use strict';

    var model = new Model();

    return Mn.View.extend({
        model: model,

        template: _.template(tpl),

        className: 'card',

        regions: {
            list: {
                el: '#list',
                replaceElement: true
            },
            form: {
                el: '#create-collection-form',
                replaceElement: true
            },
        },

        initialize: function () {
            // work in progress unknown issue with fetching data from localStorage
            // var self = this;
            // this.model = new WebcamModel();
            // this.model.fetch().done(function(data){
            //     self.collection = new WebcamCol(data);
            //     self.displayColView();
            // });
            var self = this;
            this.collection = new ListCol();
            this.collection.fetch().done(function (data) {
                console.log('fdata', data)
                //collection = new ListCol(data);
                self.displayColView(data);
            });
        },

        onRender: function () {
            this.showChildView('form', new CreateCollectionForm())
        },

        displayColView: function(data) {
            this.showChildView('list', new CollectionList({ collection: this.collection }));
        },

    })

});