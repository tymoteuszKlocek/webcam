define([
'backbone'
], function (Bb) {
	'use stric';

	return Bb.Model.extend({
		defaults: {
			lat: '3',
			lng: '4'
		}
	})
})