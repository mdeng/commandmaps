define([
	'jquery',
	'underscore',
	'backbone'
	], function($, _, Backbone) {
		
		var Trial = Backbone.model.extend({
			urlRoot: '/trials' // backbone uses this to sync models back to the server: 
			// for a model with ID 1, can do PUT radiant-journey-8771.herokuapp.com/trials/1 or something
			// can also use a collection with its URL: a collection just being a group of models.
		})
		return Trial;

});
