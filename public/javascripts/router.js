define([
	'jquery',
	'underscore',
	'backbone',
	'views/HelloView',
	'views/PartOneInfoView',
	'views/PartOneMainView',
	'views/PartTwoInfoView',
	'views/PartTwoMainView',
], function($, _, Backbone, HelloView, PartOneInfoView, PartOneMainView, PartTwoInfoView, PartTwoMainView) {

	var Router = Backbone.Router.extend({
		routes: {
			"": "hello",
			"1-info": "partOneInfo",
			"1-main": "partOneMain",
			"2-info": "partTwoInfo",
			"2-main": "partTwoMain",
		}
	});

	var initialize = function() {
		var router = new Router();
		console.log('initialize');
		router.on('route:hello', function() {
			var helloView = new HelloView();
		});
		router.on('route:partOneInfo', function() {
			var partOneInfoView = new PartOneInfoView();
		});
		router.on('route:partOneMain', function() {
			var partOneMainView = new PartOneMainView();
		});
		router.on('route:partTwoInfo', function() {
			var partTwoInfoView = new PartTwoInfoView();
		});
		router.on('route:partTwoMain', function() {
			var partTwoMainView = new PartTwoMainView();
		});
		Backbone.history.start();
	}

	return {
		initialize: initialize
	};
});
