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
        className: 'card',
        ui: {
            submit: '#create-account',
            title: '#input-collection-title'
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
                this.model.createNewCollection().done(function (success) {
                    if (success) {
                        self.render();
                        self.showChildView('info', new Info({ text: 'Great! New collection was created.' }))
                    } else {
                        self.showChildView('info', new Info({ text: 'Ups... The title is already used.' }))
                    }
                });
            }

        }
    })
});