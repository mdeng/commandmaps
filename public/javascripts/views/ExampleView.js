define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/template.html'
	], function($, _, Backbone, template) {
		
		var ExampleView = Backbone.View.extend({
			el: '#example', // identify the div which this view controls by id, class, whichever
			events: {
				// lets you respond to events that happen within the div for this view
				'click a#Button': 'onClickButton'
			},
			initialize: function() {
				// called when you init the view
				// for example, you can then render the view
				this.render();
			},
			render: function() {
				// render a view somehow, maybe by pulling data from the server, running it through a template, and then rendering the div
				data = getDataFromServer(); // this is just an example
				// underscore takes data and fleshes out the html template
				var template = _.template(template, {info: data});
				// jquery changes the html inside the view div to be the fleshed-out template
				this.$el.html(template);
			},
			onClickButton: function(ev) {
				// handle the event defined above
				ev.preventDefault();
			}
		});
		return ExampleView;

});
