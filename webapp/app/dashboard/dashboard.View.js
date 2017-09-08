define([
    'marionette',
    'text!app/dashboard/dashboard.View.html',
    'app/dashboard/dashboard.Model',
    'app/common/lists/gallery/list.View',
    'app/common/gallery-form/form.View',
], function (Mn, tpl, Model, GalleryList, GalleryForm) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),

        template: _.template(tpl),

        className: 'card',

        regions: {
            list: {
                el: '.list',
                replaceElement: true
            },
            form: {
                el: '.form-region',
                replaceElement: true
            },
        },

        ui: {
            addNew: '.add-new-btn'
        },

        childViewEvents: {
            'save:webcam2': 'onSaveWebcam'
        },

        events: {
            'click @ui.addNew': 'showForm'
        },

        initialize: function (options) {

            // type is for mini dashbord in webcams view or normal in dashbord tab
            this.type = options.opt || 'normal';
            this.showChildView('list', new GalleryList({opt: this.type}));
        },

        showForm: function (e) {
            e.preventDefault();
            this.showChildView('form', new GalleryForm());
            this.ui.addNew.addClass('hide');
        },

        onChildviewHideForm: function () {
            this.detachChildView('form');
            this.ui.addNew.removeClass('hide');
            this.showChildView('list', new GalleryList({opt: this.type}));
        },

        onSaveWebcam: function(collectionID) {
            this.triggerMethod('save:webcam3', collectionID);
        }


    });

});