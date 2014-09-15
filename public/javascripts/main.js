requirejs.config({
	baseURL: "javascripts",
	paths: {
		jquery: "libraries/jquery-2.1.1",
		underscore: "libraries/underscore",
		backbone: "libraries/backbone",
		text: "libraries/text",
		q: "libraries/q",
		templates: "../templates"
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});
require(['app'], function(App) {
	App.initialize();
});