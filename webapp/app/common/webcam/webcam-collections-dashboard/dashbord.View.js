define([
    'marionette',
    'text!app/common/webcam/webcam-collections-dashboard/dashboard.View.html',
    'app/common/webcam/webcam-collections-dashboard/dashboard.Model',
    'app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.CollectionView',
    'app/common/webcam/webcam-collections-dashboard/webcam-collection-form/form.View',
    'app/common/webcam/webcam-collections-dashboard/webcam-collections-list/list.Collection'
], function (Mn, tpl, Model, CollectionList, CreateCollectionForm, ListCol) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),

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

        ui: {
            addNew: '#add-new-btn'
        },

        events: {
            'click @ui.addNew': 'showForm'
        },

        initialize: function () {
            var self = this;
            this.collection = new ListCol();
            //TODO is only fetch enough?
            this.collection.fetch().done(function (data) {
                self.displayColView(data);
            });
        },

        onRender: function () {

        },

        displayColView: function (data) {
            this.showChildView('list', new CollectionList({ collection: this.collection }));
        },

        showForm: function (e) {
            e.preventDefault();
            this.showChildView('form', new CreateCollectionForm());
            this.ui.addNew.addClass('hide');
        },

        onChildviewHideForm: function () {
            var self = this;
            this.collection.fetch();
            this.detachChildView('form');
            this.ui.addNew.removeClass('hide');
        },

        onChildviewFetchCollection: function () {
            var self = this;
            this.collection.fetch();
            this.detachChildView('form');
        },

        onChildviewSetCollectionID: function (collectionID) {
            console.log('collectionID ' + collectionID);
            this.triggerMethod('set:collectionID', collectionID);
        }

    })

});