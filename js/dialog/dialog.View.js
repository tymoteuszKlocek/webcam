define([
    'marionette',
    'backbone',
    'text!dialog/dialog.html',
    'dialog-list/dialogList.CollectionView'
], function(Mn, Bb, tpl, DialogList) {
    'use stric';

    var Dialog = Bb.Model.extend(); // is this ok?

    return Mn.View.extend({
        template: _.template(tpl),
        className: 'panel',
        regions: {
            listRegion: {
                replaceElement: true,
                el: '#list-container'
            }
        },
        ui: {
            back: '#back',
            save: '#save'
        },
        triggers: {
            'click @ui.back': 'hide:dialog'
        },
        events: {
            'click @ui.save': 'saveNewWebcam'
        },
        saveNewWebcam: function() {
            //save here
            console.log('saved');
        },
        onRender: function() {
            this.showChildView('listRegion', new DialogList());
        }
    })
})