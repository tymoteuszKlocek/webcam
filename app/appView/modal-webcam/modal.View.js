

//this module is not used//

define([
    'backbone',
    'marionette',
    'text!app/appView/modal-webcam/modal.View.html',
    'app/appView/modal-webcam/modal.Model',
    'app/appView/common/webcam/webcam.Model',
    'app/appView/common/webcam/webcam.View',
    'app/appView/common/session/session'
], function (Bb, Mn, tpl, ModalModel, WebcamModel, WebcamView, Session) {
    'use strict';

    var session = new Session();
    return Mn.View.extend({
        model: new ModalModel(),
        template: _.template(tpl),
        regions: {
            link: '#link'
        },
        events: {
            'change': 'render'
        },
        onBeforeRender: function(options) {
            var self = this;
            session.searchWithId(this.model.id).then(function (resp) {
                self.model.url = resp.result.webcams["0"].url.current.desktop;
                console.log('self.model.url1', self.model.url)
                
            });
        },
        onRender: function (options) {
        }
    });
});