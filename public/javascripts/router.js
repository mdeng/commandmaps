define([
	'jquery',
	'underscore',
	'backbone',
	'views/HelloView',
	'views/InfoView',
	'views/MainView',
	'views/PreferenceView',
	'views/GoodbyeView',
], function($, _, Backbone, 
		HelloView,
		InfoView,
		MainView,
		PreferenceView, 
		GoodbyeView) {

	var Router = Backbone.Router.extend({
		routes: {
			"": "hello",
			"info": "info",
			"info/:part": "info",
			"main": "main",
			"main/:part": "main",
			"prefs": "prefs",
			"goodbye": "goodbye",
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
		router.on('route:prefs', function() {
			console.log('hey');
			var preferenceView = new PreferenceView();
		});
		router.on('route:goodbye', function() {
			var goodbyeView = new GoodbyeView();
		});
		Backbone.history.start();
	}

	return {
		initialize: initialize
	};
});
