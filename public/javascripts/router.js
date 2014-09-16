define([
	'jquery',
	'underscore',
	'backbone', // below: add views as needed in the form "views/viewname" with no .js
	'views/HelloView',
	'views/PartOneInfoView',
	'views/PartOneMainView',
], function($, _, Backbone, HelloView, PartOneInfoView, PartOneMainView) {

	var Router = Backbone.Router.extend({
		routes: {
			"": "hello",
			"1-info": "partOneInfo",
			"1-main": "partOneMain",
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
		Backbone.history.start();
	}

	return {
		initialize: initialize
	};
});
