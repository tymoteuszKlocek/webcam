define([
    'marionette',
    'backbone',
    'text!dialog/dialog.html',
    'dialog-list/dialogList.CollectionView',
], function (Mn, Bb, tpl, DialogList) {
    'use stric';

    var Dialog = Bb.Model.extend(); // is this ok?
    var renderChannel = Backbone.Radio.channel('renderView');
    var dialogList = new DialogList();
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
            webcamName: 'input[name=webcamName]',
            galleryName: 'input[name=galleryName]',
            save: '#store',
            closeDialog: '#back'
        },
        childViewEvents: {
            'child:title:selected': 'useTitle',
        },
        triggers: {
            'click @ui.closeDialog': 'hide:dialog'
        },
        events: {
            'click @ui.save': 'saveNewWebcam',
            'click @ui.closeDialog': 'closeDialog'
        },
        saveNewWebcam: function () {
            //save here
            console.log('saved');
        },
        closeDialog: function(){
            renderChannel.trigger('show:finder');
        },
        useTitle: function (title) {
            console.log('listen to title:selected', title)
            this.ui.galleryName.val(title);
        },
        onRender: function () {
            this.showChildView('listRegion', dialogList);
        }
    })
})