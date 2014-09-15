define([
	'jquery',
	'underscore',
	'backbone' // below: add views as needed in the form "views/viewname" with no .js
], function($, _, Backbone /* also add views here to use them as variables */) {

	var Router = Backbone.Router.extend({
		/*
			basically map backbone routes to functions: backbone only cares about stuff after the # in a URL
			example: radiant-journey-8771.herokuapp.com/#
			corresponds to: ""
			radiant-journey-8771.herokuapp.com/#test/1 to "test/:testnumber" etc. */
		routes: {
			"": "main",
		}
	});

	var initialize = function() {
		var router = new Router();
		console.log('initialize');
		router.on('route:main', function() {
			console.log('main');
			// do something when the page loads
			var infoView = new InfoView();
			infoView.render();
		});
	}

	return {
		initialize: initialize
	};
});
