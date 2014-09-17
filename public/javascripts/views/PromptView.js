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
			render: function(item) {
				//var info = {name: item.name};
				var template = _.template(instruct, {variable: 'info'})(item);
				// jquery changes the html inside the view div to be the fleshed-out template
				//this.$el.html(template);
				$('#prompt-container').html(template);
				//this.delegateEvents();
			},
		});
		return PromptView;

});
