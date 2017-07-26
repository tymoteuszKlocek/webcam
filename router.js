define([
    'backbone',
    'marionette',
    //'radio',
    'app/appView/appView',
    'app/appView/scanner/scanner.View',
    'app/appView/webcams-list/list.View',
    'app/appView/local-webcams/localWebcams.View',
], function (Bb, Mn, AppView, Scanner, List, LocalView,) {
    'use strict';

    var filterChannel = Bb.Radio.channel('filter');
    return Mn.AppRouter.extend({
        routes: {
            '*filter': 'filterItems'
        },
        filterItems: function (filter) {
            var newFilter = filter && filter.trim() || 'all'; // hot to use that???
            //filterChannel.request('filterState', newFilter);
            if (newFilter === 'new-webcam') {
                filterChannel.request('filterState', new Scanner());
            }
            if (newFilter === 'list-of-webcams') {
                filterChannel.request('filterState', new List());
            }
            if (newFilter === 'webcams-near-you') {
                filterChannel.request('filterState', new LocalView());
            }
        }
    });
});