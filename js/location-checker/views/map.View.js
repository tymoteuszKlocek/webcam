﻿define([
	'marionette',
	'location-checker/models/map.Model',
	'text!templates/map.html'
], function (Mn, Model, tpl) {
	'use strict';

	return Mn.View.extend({
		model: Model,
		template: tpl, // _.template(tpl, Model);
		initialize: function () {
			var map, infoWindow;
			function initMap() {

				map = new google.maps.Map(document.getElementById('map'), {
					center: { lat: -34.397, lng: 150.644 },
					zoom: 6
				});
				infoWindow = new google.maps.InfoWindow;

				// Try HTML5 geolocation.
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						var pos = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						};
						console.log('your position from view', pos);
						infoWindow.setPosition(pos);
						infoWindow.setContent('Location found.');
						infoWindow.open(map);
						map.setCenter(pos);
					}, function () {
						handleLocationError(true, infoWindow, map.getCenter());
					});
				} else {
					// Browser doesn't support Geolocation
					handleLocationError(false, infoWindow, map.getCenter());
				}
			}

			function handleLocationError(browserHasGeolocation, infoWindow, pos) {
				infoWindow.setPosition(pos);
				infoWindow.setContent(browserHasGeolocation ?
					'Error: The Geolocation service failed.' :
					'Error: Your browser doesn\'t support geolocation.');
				infoWindow.open(map);
			}
		}
	})
})