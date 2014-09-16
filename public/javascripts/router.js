define([
	'jquery',
	'underscore',
	'backbone',
	'views/HelloView',
	'views/PartOneInfoView',
	'views/PartOneMainView',
	'views/PartTwoInfoView',
	'views/PartTwoMainView',
	'views/PartThreeInfoView',
	'views/PartThreeMainView',
	'views/PartFourInfoView',
	'views/PartFourMainView',
], function($, _, Backbone, 
		HelloView, 
		PartOneInfoView, 
		PartOneMainView, 
		PartTwoInfoView, 
		PartTwoMainView,
		PartThreeInfoView,
		PartThreeMainView,
		PartFourInfoView,
		PartFourMainView) {

	var Router = Backbone.Router.extend({
		routes: {
			"": "hello",
			"1-info": "partOneInfo",
			"1-main": "partOneMain",
			"2-info": "partTwoInfo",
			"2-main": "partTwoMain",
			"3-info": "partThreeInfo",
			"3-main": "partThreeMain",
			"4-info": "partFourInfo",
			"4-main": "partFourMain",
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
		router.on('route:partThreeInfo', function() {
			var partThreeInfoView = new PartThreeInfoView();
		});
		router.on('route:partThreeMain', function() {
			var partThreeMainView = new PartThreeMainView();
		});
		router.on('route:partFourInfo', function() {
			var partFourInfoView = new PartFourInfoView();
		});
		router.on('route:partFourMain', function() {
			var partFourMainView = new PartFourMainView();
		});
		Backbone.history.start();
	}

	return {
		initialize: initialize
	};
});
