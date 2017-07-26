define([
    'marionette',
    'text!app/appView/webcams-list/list.View.html',
    'app/appView/common/webcam/webcam.CollectionView'
], function(Mn, tpl, WebColView) {
    'use strict';
    
    return Mn.View.extend({
        template: _.template(tpl),
        regions: {
            list: '#list'
        },
        onRender: function() {
            this.showChildView('list', new WebColView());
        }
    })
});