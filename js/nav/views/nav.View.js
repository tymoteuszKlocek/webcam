define([
	'marionette',
	'models/nav.Model'
], function (Mn, nav) {
	'use strict';
	var template = _.template('<li><%= title %><li>')

	return Mn.View.extend({
		template: template
	})
})