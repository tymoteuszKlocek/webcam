define([
    'marionette',
    'text!app/appView/common/webcam/webcam.Collection.html',
    'app/appView/common/webcam/webcam.Collection',
    'app/appView/common/webcam/webcam.View',
    'app/appView/common/webcam/webcam.Model',
], function (Mn, tpl, WebcamCol, WebcamColView, WebcamModel) {
    'use strict';

    var collection = new WebcamCol([
        {
            title: 'Paris',
            url: 'https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_233/visuel-carrousel-dossier-ou-sortir-le-soir-a-paris-740x380-c-dr/16967596-1-fre-FR/Visuel-carrousel-dossier-Ou-sortir-le-soir-a-Paris-740x380-C-DR.jpg'
        },
        {
            title: 'Lublin',
            url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Lublin%2C_Royal_Castle%2C_30-04-2010.jpg'
        },
        {
            title: 'London',
            url: 'https://static.pexels.com/photos/50632/pexels-photo-50632.jpeg'
        },
    ]);

    //TODO use fetch and save
    // var collection;
    // var col = new WebcamModel();
    // col.fetch({
    //     success: function (col) {
    //         console.log('fetched obj', col.attributes);
    //         collection =  new WebcamCol(col.attributes)
    //     }
    // });
    return Mn.CollectionView.extend({
        collection: collection,
        template: _.template(tpl),
        tagName: 'ul',
        className: 'media-list',
        childView: WebcamColView,
        onChildviewChildSave: function (childView) {
            var webcamDetails = {
                title: 'test1',
                url: 'https://static.pexels.com/photos/50632/pexels-photo-50632.jpeg'
            };
            // var newWebcam = new WebcamModel();
            // newWebcam.save(webcamDetails, {
            //     success: function (newWebcam) {
            //         console.log('webacm saved', newWebcam);
            //     }
            // });
            console.log('wowo')
            var col = new WebcamModel();
            col.fetch({
                success: function (col) {
                    console.log('fetched obj', col.attributes);
                }
            })
        },
        onChildviewChildDelete: function (childView) {
            this.removeChildView(childView);
        }
    });
});