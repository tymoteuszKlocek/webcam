define([
	'marionette',
	'location-checker/map.Model',
	'text!location-checker/map.html',
], function (Mn, Model, tpl) {
	'use strict';

	var model = new Model();
	//TODO - where put this: 
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			model.set('lat', position.coords.latitude);
			model.set('lng', position.coords.longitude);
		});
	} else {
		alert("I can't use localisation")
	}
	return Mn.View.extend({
		model: model,
		template: _.template(tpl),
		initialize: function () {
		},
		onRender: function () {
		}
	})

});