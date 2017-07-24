define([
    'marionette',
    'text!dialog-list/dialogListItem.html',
    'dialog-list/dialogListItem.Model'
], function (Mn, tpl, Model) {
    'use strict';

    return Mn.View.extend({
        template: _.template(tpl),
        tagName: 'li',
        ui: {
            input: 'input[name=title]',
            link: '#link'
        },
        triggers:{
            'click this.ui.input': 'item:clicked',
            'click this.ui.link': 'item:clicked'
        },
        evnet: {
            'click a': 'showMe'
        },
        showMe: function(){
            alert('show')
        }
  

    });
})