define([
	'jquery',
	'underscore',
	'backbone',
	'views/HelloView',
	'views/InfoView',
	'views/MainView',
], function($, _, Backbone, 
		HelloView,
		InfoView,
		MainView,
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
			"info": "info",
			"info/:part": "info",
			"main": "main",
			"main/:part": "main",
		}
	});

	var initialize = function() {
		var router = new Router();
		console.log('initialize');
		router.on('route:hello', function() {
			var helloView = new HelloView();
		});
		router.on('route:info', function(part) {
			console.log("route:info");
			if (typeof part != 'undefined') {
				console.log('part is ' + part);
				var info = new InfoView({ part: part });
			} else {
				console.log("undefined part");
				var info = new InfoView({ part: 1 })
			}
		});
		router.on('route:main', function(part) {
			if (typeof part != 'undefined') {
				var main = new MainView({ part: part });
			} else {
				var main = new MainView({ part: 1 });
			}
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
