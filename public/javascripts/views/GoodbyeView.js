define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/goodbye.html'
	], function($, _, Backbone, instruct) {
		
		var GoodbyeView = Backbone.View.extend({
			el: '#overlay-container',
			events: {
				'click button#button-goodbye': 'onClickGoodbye'
			},
			initialize: function() {
				this.$el.removeClass('hidden');
				this.render();
			},
			render: function() {
				_.templateSettings.variable = 'info';
				this.$el.html(_.template(instruct, {variable: 'info'})(window.CMUser));
			},
			onClickGoodbye: function(e) {
				window.CMUser = null;

				console.log('logged out user');
				Backbone.history.navigate('', { trigger: true, replace: true });
			}
		});
		return GoodbyeView;

});
