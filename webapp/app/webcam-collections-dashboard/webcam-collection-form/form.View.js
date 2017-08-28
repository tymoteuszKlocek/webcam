define([
    'marionette',
    'text!app/webcam-collections-dashboard/webcam-collection-form/form.View.html',
    'app/webcam-collections-dashboard/webcam-collection-form/form.Model',
    'app/common/webcam/webcam.CollectionView',
    'app/common/info/info.View'
], function (Mn, tpl, Model, WebcamColView, Info) {
    'use strict';

    return Mn.View.extend({
        model: new Model(),
        template: _.template(tpl),
        className: 'alert alert-success',
        ui: {
            submit: '#create-account',
            title: '#input-collection-title',
            form: "#form"
        },
        regions: {
            list: {
                el: '#list',
                replaceElement: true
            },
            info: '#info'
        },
        events: {
            'click @ui.submit': 'createNewCollection'
        },
        createNewCollection: function () {
            var self = this;
            if (this.ui.title.val() !== '') {
                this.model.set('title', this.ui.title.val());
                this.model.requestNewCollection().done(function (success) {
                    if (success) {
                        self.triggerMethod('hide:form');
                        self.showChildView('info', new Info({ text: 'Great! New collection was created.' }))
                    } else {
                        self.showChildView('info', new Info({ text: 'Ups... The title is already used.' }))
                    }
                });
            } else {
                alert('You need to write a title.')
            }
        }
    })
});