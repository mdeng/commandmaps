define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/hello.html'
	], function($, _, Backbone, instruct) {
		
		var HelloView = Backbone.View.extend({
			el: '#overlay-container',
			events: {
				'click button#btn-begin': 'onClickBegin'
			},
			initialize: function() {
				this.$el.removeClass('hidden');
				// called when you init the view
				// for example, you can then render the view
				this.render();
			},
			render: function() {
				_.templateSettings.variable = 'info';
				this.$el.html(_.template(instruct));
			},
			onClickBegin: function(e) {
				// handle the event defined above
				$.getJSON('/users/new', function(response) {
					// LOL
					window.CMUser = response;

					console.log(response);
					Backbone.history.navigate('info/1', {trigger: true, replace: true});
				});
			}
		});
		return HelloView;

});
