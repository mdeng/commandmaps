define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/instructions.html'
	], function($, _, Backbone, instruct) {
		
		var InfoView = Backbone.View.extend({
			el: '#content-container', // identify the div which this view controls by id, class, whichever
			events: {
				// lets you respond to events that happen within the div for this view
				//'click a#Button': 'onClickButton'
			},
			initialize: function() {
				// called when you init the view
				// for example, you can then render the view
				this.render();
			},
			render: function() {
				// render a view somehow, maybe by pulling data from the server, running it through a template, and then rendering the div
				var data = {'text': 'this is text', 'list': [{moretext: '1'}, {moretext: '2'}]};
				// defines a variable to use for scoping the template
				_.templateSettings.variable = 'info';
				// underscore takes the template and parses it
				var temp = _.template(instruct);
				// temp(data) inserts the data into the underscore template, then
				// jquery changes the html inside the view div to be the fleshed-out template
				this.$el.html(temp(data));
			},
			onClickButton: function(ev) {
				// handle the event defined above
				ev.preventDefault();
			}
		});
		return InfoView;

});
