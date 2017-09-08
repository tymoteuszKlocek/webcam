define([
    'marionette',
    'text!app/common/gallery-form/form.View.html',
    'app/common/gallery-form/form.Model',
    'app/common/info/info.View'
], function (Mn, tpl, Model, Info) {
    'use strict';

    return Mn.View.extend({

        model: new Model(),

        template: _.template(tpl),

        className: 'alert alert-success',

        ui: {
            submit: 'input[name=create-account]',
            title: 'input[name=collection-title]',
            form: '.form'
        },

        regions: {
            info: '.info'
        },

        events: {
            'click @ui.submit': 'createNewCollection'
        },
        
        createNewCollection: function (e) {
            e.preventDefault();
            var self = this;
            if (this.ui.title.val() !== '') {
                this.model.set('title', this.ui.title.val());
                this.model.submit().done(function (success) {
                    if (success) {
                        self.triggerMethod('hide:form');
                    } else {
                        self.showChildView('info', new Info({ text: 'Ups... The title is already used.' }));
                    }
                });
            } else {
                self.showChildView('info', new Info({ text: 'You need to write a title.' }));
            }
        }
    });
});