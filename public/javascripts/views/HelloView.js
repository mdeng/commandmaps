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
			initialize: function(options) {
				window.isTurk = options.isTurk;
				this.$el.removeClass('hidden');
				this.render();
			},
			render: function() {
				_.templateSettings.variable = 'info';
				this.$el.html(_.template(instruct));
			},
			getIsTurk: function () {
				return this.isTurk;
			},
			onClickBegin: function(e) {
				// handle the event defined above
				$.getJSON('/users/new', function(response) {
					window.CMUser = response;

					console.log(response);
					Backbone.history.navigate('info/1', {trigger: true, replace: true});
				});
			}
		});
		return HelloView;

});
