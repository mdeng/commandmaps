define([
	'jquery',
	'underscore',
	'backbone',
	'commands',
	'text!../templates/item_prompt.html',
	], function($, _, Backbone, Commands, instruct) {
		var PromptView = Backbone.View.extend({
			el: '#prompt-container',
			initialize: function() {
			},
			render: function(count) {
				alert('rendering ' + count);
				//_.templateSettings.variable = 'info';
				var info = {name: 'hi'};
				var template = _.template(instruct);
				// jquery changes the html inside the view div to be the fleshed-out template
				this.$el.html(template);
				this.delegateEvents();
			},
		});
		return PromptView;

});
